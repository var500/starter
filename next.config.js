const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

const advancedHeaders = [
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'Referrer-Policy',
		value: 'origin-when-cross-origin',
	},
];

const ENV = process.env.NODE_ENV || 'development';

const env = {
	development: {
		ENV: 'development',
		SITE_TITLE: 'Blockgames',

		RPC_URL: '',
		GAS_STATION_URL: '',
		RPC_KEY: '',
		WEB3STORAGE_TOKEN: '',

		FOUNDER_ADDRESS: '0xCA19d8CBe76b448c7974326CB23C3Cc24d586115',
		HERO_ADDRESS: '0x43DA4FbDD9582729d668017DeE31170E1F671292',
		RUNE_ADDRESS: '0x9F704519982BB93eC5CEB91CB82d526D24E226aA',
		TOKEN_ADDRESS: '0xEeF33655C65980380D543b10a35Ff4F9DE721B9D',

		BACKEND_URL: '',
		FRONTEND_URL: '',
		BASE_URL: '',
	},
	production: {
		ENV: 'production',
		SITE_TITLE: 'Blockgames',

		RPC_URL: '',
		GAS_STATION_URL: '',
		RPC_KEY: '',
		WEB3STORAGE_TOKEN: '',

		FOUNDER_ADDRESS: '',
		HERO_ADDRESS: '',
		RUNE_ADDRESS: '',
		TOKEN_ADDRESS: '',

		BACKEND_URL: '',
		FRONTEND_URL: '',
		BASE_URL: '',
	},
	test: {
		ENV: 'test',
		SITE_TITLE: 'Blockgames',

		RPC_URL: '',
		GAS_STATION_URL: '',
		RPC_KEY: '',
		WEB3STORAGE_TOKEN: '',

		FOUNDER_ADDRESS: '',
		HERO_ADDRESS: '',
		RUNE_ADDRESS: '',
		TOKEN_ADDRESS: '',

		BACKEND_URL: '',
		FRONTEND_URL: '',
		BASE_URL: '',
	},
}[ENV];

const compiler = {
	development: {
		removeConsole: {
			exclude: ['error', 'log'],
		},
	},
	production: {
		removeConsole: {
			exclude: ['error'],
		},
	},
	test: {
		removeConsole: {
			exclude: ['error'],
		},
	},
}[ENV];

const nextConfig = {
	/**
	 * @type {import('next').NextConfig}
	 */

	modularizeImports: {
		'@assets': {
			transform: path.resolve(__dirname, 'src/assets/index.ts'),
		},

		'@/axios': {
			transform: path.resolve(__dirname, 'src/core/service/axios/index.ts'),
		},

		'@/env': {
			transform: path.resolve(__dirname, 'src/core/constants/env.ts'),
		},
		'@/base/?(((\\w*)?/?)*)': {
			transform: path.resolve(__dirname, 'src/components/Base/{{ matches.[1] }}/{{member}}'),
		},
		'@/constants/?(((\\w*)?/?)*)': {
			transform: path.resolve(__dirname, 'src/core/constants/{{ matches.[1] }}/{{member}}'),
		},
		'@/hooks/': {
			transform: path.resolve(__dirname, 'src/lib/hooks/{{member}}'),
		},
	},
	env,
	compiler,
	swcMinify: true,
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: '/:path*',
				headers: advancedHeaders,
			},
		];
	},

	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	webpack: (config, _options) => {
		config.plugins.push(new StylelintPlugin());
		const { options: loaderOptions } = config.module.rules.find(
			(rule) => rule.test && rule.test.test('.svg')
		);

		config.module.rules.push({
			test: /\.svg$/i,
			resourceQuery: /inline/, // *.svg?inline
			dependency: { not: ['url'] },
			issuer: { not: /\.(css|scss|sass)$/ },
			use: [
				_options.defaultLoaders.babel,
				{
					loader: '@svgr/webpack',
					options: {
						babel: false,
						svgo: false,
					},
				},
			],
		});
		config.module.rules.push({
			test: /\.svg$/i,
			resourceQuery: { not: [/inline/] },
			loader: 'next-image-loader',
			issuer: { not: /\.(css|scss|sass)$/ },
			dependency: { not: ['url'] },
			options: loaderOptions,
		});
		return config;
	},
};

module.exports = async (_phase) => {
	/**
	 * @type {import('next').NextConfig}
	 */

	const plugins = [];

	return plugins.reduce((acc, next) => next(acc), nextConfig);
};
