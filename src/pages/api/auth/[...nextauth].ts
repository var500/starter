import { compareSync } from 'bcrypt-ts';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions, User } from 'next-auth';
import NextAuth from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import KYC from '@/lib/models/KYC';
import UserModel from '@/lib/models/User';
import dbConnect from '@/lib/mongoDb';
import { hashPassword } from '@/lib/scripts/authHelpers';
import type { KycStatus, Role } from '@/lib/types/common';
import type { IUser } from '@/lib/types/models';
import {
	getAppleProviderConfig,
	getGithubProviderConfig,
	getGoogleProviderConfig,
	getWorldIdProviderConfig,
} from '@/utils/env';

const { googleClientId, googleClientSecret } = getGoogleProviderConfig();
const { worldIdClientId, worldIdClientSecret } = getWorldIdProviderConfig();
const { appleClientId, appleClientSecret } = getAppleProviderConfig();
const { githubClientId, githubClientSecret } = getGithubProviderConfig();

export const authOptions: NextAuthOptions = {
	providers: [
		{
			id: 'worldcoin',
			name: 'Worldcoin',
			type: 'oauth',
			wellKnown: 'https://id.worldcoin.org/.well-known/openid-configuration',
			authorization: { params: { scope: 'openid' } },
			clientId: worldIdClientId,
			clientSecret: worldIdClientSecret,
			idToken: true,
			checks: ['state', 'nonce', 'pkce'],
			//@ts-ignore
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.sub,
					verificationLevel: profile['https://id.worldcoin.org/v1'].verification_level,
				};
			},
		},
		// Email & Password
		CredentialsProvider({
			name: 'Email & Password',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
				password: { label: 'Password', type: 'password' },
				role: { label: 'Role', type: 'text' },
				screen: { label: 'Screen', type: 'text' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error('Email and password are required.');
				}

				await dbConnect();

				// Check if the user exists
				let user = (await UserModel.findOne({
					email: credentials.email.toLowerCase(),
				}).select('+password')) as IUser;

				if (credentials.screen === 'register') {
					if (user) {
						throw new Error('User Already register. Please Login Instead');
					}
				}

				if (!user) {
					// Register the new user
					const { hash } = await hashPassword(credentials.password);
					const newUser = new UserModel({
						email: credentials.email.toLowerCase(),
						password: hash,
						role: credentials.role,
						isOAuthUser: false,
						kycStatus: 'not_started',
					});

					user = await newUser.save();

					const kyc = new KYC({
						userId: user.id,
						documents: [],
						status: 'not_started',
					});

					await kyc.save();
				} else {
					// If the user exists, handle OAuth-specific cases
					if (user.isOAuthUser && !user.password) {
						// Set the provided password for the OAuth user
						const { hash } = await hashPassword(credentials.password);
						user.password = hash;
						await user.save();

						return {
							id: user._id.toString(),
							email: user.email,
							role: user.role,
							kycStatus: user.kycStatus,
						};
					}

					if (!user.password) {
						throw new Error('Password is missing for this user.');
					}

					// Verify the password
					const isPasswordValid = compareSync(credentials.password, user.password);
					if (!isPasswordValid) {
						throw new Error('Invalid email or password.');
					}
				}

				return { id: user._id.toString(), email: user.email, role: user.role };
			},
		}),

		GithubProvider({
			clientId: githubClientId,
			clientSecret: githubClientSecret,
		}),

		// Google OAuth
		GoogleProvider({
			clientId: googleClientId,
			clientSecret: googleClientSecret,
		}),

		// Apple OAuth
		AppleProvider({
			clientId: appleClientId,
			clientSecret: appleClientSecret,
		}),
	],
	cookies: {
		pkceCodeVerifier: {
			name: 'next-auth.pkce.code_verifier',
			options: {
				httpOnly: true,
				sameSite: 'none',
				path: '/',
				secure: true,
			},
		},
	},

	callbacks: {
		async signIn({ user, account }) {
			console.log({ user, account });
			if (!account || !user || !user.email) {
				console.log('Signin failed');

				return false;
			}

			await dbConnect();

			const existingUser = await UserModel.findOne({ email: user.email });

			if (!existingUser) {
				// Create a new user for OAuth login
				const newUser = new UserModel({
					email: user.email,
					name: user.name || null,
					image: user.image || null,
					provider: account.provider || null,
					providerId: account.providerAccountId || null,
					isOAuthUser: true,
					kycStatus: 'not_started',
					role: 'investor', // Default role for new OAuth users
				});
				await newUser.save();
				user.role = 'investor'; // Assign role to the user object
				user.id = newUser.id;
				user.kycStatus = 'not_started';
				const kyc = new KYC({
					userId: user.id,
					documents: [],
					status: 'not_started',
				});

				await kyc.save();
			} else {
				user.role = existingUser.role;
				user.id = existingUser.id;
				user.kycStatus = existingUser.kycStatus;
			}

			return true;
		},

		async jwt({ token, user, account }) {
			if (user) {
				const { id, email, role, kycStatus } = user as User; // Explicit cast to `User`
				token.id = id;
				token.kycStatus = kycStatus;
				token.email = email;
				token.role = role; // Include the role in the token
			}
			if (account) {
				token.accessToken = account.access_token;
			}

			return token;
		},

		async session({ session, token }) {
			session.user = {
				id: token.id as string,
				kycStatus: token.kycStatus as KycStatus,
				email: token.email as string,
				name: session.user?.name,
				image: session.user?.image,
				role: token.role as Role, // Include the role in the session
			};

			session.accessToken = token.accessToken as string;

			return session;
		},
		async redirect({ baseUrl }) {
			return baseUrl + '/investor/kyc'; // Redirect to the dashboard
		},
	},
	experimental: { enableWebAuthn: true },

	pages: {
		error: '/auth/error',
	},
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	return NextAuth(req, res, authOptions);
}
