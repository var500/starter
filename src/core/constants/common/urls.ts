// export const BASEURL = 'https://dev.noncestarter.in' as const;
export const BASEURL = 'http://localhost:3000' as const;

export const AUTH_URLS = {
	login: '/user/login',
	preferences: '/user/intrest',
	register: '/user/register',
} as const;

export const URLS = {
	...AUTH_URLS,
	airdrop: '/airdrop',
	kyc: '/api/kyc/upload',
	kycDocuments: '/api/kyc/user/documents',
	user: '/api/user/details',
	createOrder: '/api/paypal/createorder',
	captureorder: '/api/paypal/captureorder',
	airdropList: '/airdrop/list',
	app: '/project',
	tier: '/api/tier/all',
	userTier: '/api/tier/user',
	subscriptions: '/api/subscriptionPlan/all',
	userSubscription: '/api/subscriptionPlan/user',
	banner: '/banner',
	bannerList: '/banner/list',
	chain: '/chain',
	chainList: '/chain/list',
	contract: '/contract',
	contractList: '/contract/list',
	dapp: '/dapp',
	dappList: '/dapp/list',
	game: '/game',
	gameList: '/game/list',
	homescreen: '/homescreen',
	marketplace: '/marketplace',
	marketplaceList: '/marketplace/list',
	nft: '/nfts',
	nftsList: '/nfts/list',
	project: '/project',
	projectList: '/project/list',
	token: '/token',
	tokenList: '/token/list',
} as const;

export type URLS_TYPE = (typeof URLS)[keyof typeof URLS];
export type AUTH_URLS_TYPE = (typeof AUTH_URLS)[keyof typeof AUTH_URLS];
