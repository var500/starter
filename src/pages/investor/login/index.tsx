import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { Box, Button, Divider, Flex, Input, Link, Text } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

import { Auth } from '@/assets';
import SocialButton from '@/components/common/Button/SocialButton';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = async () => {
		const res = await signIn('credentials', {
			callbackUrl: '/investor/kyc',
			email,
			password,
			role: 'investor',
			screen: 'login',
		});

		if (res?.error) {
			alert('Error: ' + res.error); // Handle error response
		} else {
			// Successfully signed in, you can redirect or handle success
			console.log('Registration successful');
		}
	};

	return (
		<Flex justifyContent={'center'} px={4}>
			<Box
				mb={20}
				sx={{
					border: '2px solid',
					borderImageSlice: 1,
					boxShadow: '18px 18px 22px 0px #1039A61A',
					borderImageSource:
						'linear-gradient(180deg, #9B51E0 0%, rgba(0, 63, 121, 0) 100%)',
				}}
			>
				<Flex
					flexDirection={'column'}
					px={10}
					pt={10}
					pb={8}
					maxW={'500px'}
					bgGradient="linear(to-b, #8952FF1A, #8952FF00)"
				>
					<Text
						variant={'simple'}
						fontSize={'48'}
						color={'white'}
						fontWeight={100}
						textAlign={'left'}
						mb={6}
					>
						Login
					</Text>
					<Text
						variant={'simple'}
						color={'white'}
						fontWeight={600}
						textAlign={'left'}
						mb={6}
					>
						Your App Success Starts here
					</Text>

					<Input
						variant="flushed"
						placeholder="Login with Email"
						borderBottom={'1px solid #212C9D'}
						mb={6}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						variant="flushed"
						placeholder="Password Here"
						border={'none'}
						borderBottom={'1px solid #212C9D'}
						mb={6}
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button variant={'investor'} onClick={handleRegister}>
						<Flex
							flexDirection={'row'}
							justifyContent={'space-between'}
							w={'100%'}
							px={10}
						>
							Login Now
							<FaChevronRight size={20} />
						</Flex>
					</Button>

					<Text variant={'simple'} my={4}>
						Not Registered?{' '}
						<Link href="/investor" color={'#8952FF'}>
							SignUp Now!
						</Link>
					</Text>

					<Flex gap={4} justifyContent={'space-between'}>
						<SocialButton
							label="World Coin"
							image={Auth.WorldIdAuth}
							click={async () => signIn('worldcoin')}
						/>
						<SocialButton
							label="Github"
							image={Auth.GithubAuth}
							click={async () => signIn('github')}
						/>
					</Flex>
					<Flex gap={4} justifyContent={'space-between'} mt={4}>
						<SocialButton
							label="Apple"
							image={Auth.AppleAuth}
							click={async () => signIn('apple')}
						/>
						<SocialButton
							label="Google"
							image={Auth.GoogleAuth}
							click={async () => signIn('google')}
						/>
					</Flex>

					<Divider
						sx={{
							borderColor: '#212C9D',
						}}
						my={6}
					/>

					<Text variant={'simple'} color={'white'} fontWeight={400}>
						By continuing you agree to Nonce Starter&apos;s{' '}
						<Link textDecoration={'underline'}>Policy Policy</Link> and{' '}
						<Link textDecoration={'underline'}>Terms Conditions</Link>
					</Text>
				</Flex>
			</Box>
		</Flex>
	);
}