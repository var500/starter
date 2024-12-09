import { Button, Flex } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
export const CustomConnectButton = () => {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				authenticationStatus,
				mounted,
			}) => {
				// Note: If your app doesn't use authentication, you
				// can remove all 'authenticationStatus' checks
				const ready = mounted && authenticationStatus !== 'loading';
				const connected =
					ready &&
					account &&
					chain &&
					(!authenticationStatus || authenticationStatus === 'authenticated');

				return (
					<div
						{...(!ready && {
							'aria-hidden': true,
							style: {
								opacity: 0,
								pointerEvents: 'none',
								userSelect: 'none',
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<Button
										variant={'outline'}
										size={'sm'}
										textColor={'white'}
										onClick={openConnectModal}
									>
										Connect Wallet
									</Button>
								);
							}
							if (chain.unsupported) {
								return (
									<button onClick={openChainModal} type="button">
										Wrong network
									</button>
								);
							}

							return (
								<Flex gap={4} alignItems={'center'}>
									<Button
										variant={'outline'}
										onClick={openChainModal}
										display={'flex'}
										alignItems={'center'}
										type="button"
										size={'sm'}
									>
										{chain.hasIcon && (
											<div>
												{chain.iconUrl && (
													<Image
														alt={chain.name ?? 'Chain icon'}
														src={chain.iconUrl}
														className="h-5 w-5"
														height={40}
														width={40}
													/>
												)}
											</div>
										)}
									</Button>
									<Button
										variant={'unstyled'}
										onClick={openAccountModal}
										type="button"
									>
										{account.displayName}
									</Button>
								</Flex>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
};
