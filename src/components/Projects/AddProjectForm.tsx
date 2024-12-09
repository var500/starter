/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Checkbox, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import type { Options } from 'browser-image-compression';
import imageCompression from 'browser-image-compression';

import { ImageUploadButton } from '../Upload/ImageUpload';
import { SingleImageUpload } from '../Upload/SingleImageUpload';

type FormData = {
	isDapp: string;
	isReleased: string;
	projectName: string;
	categories: string[];
	website: string;
	shortDescription: string;
	tags: string[];
	chain: string;
	fullDescription: string;
	weChat: string;
	telegram: string;
	social: {
		facebook: string;
		twitter: string;
		youtube: string;
		tiktok: string;
	};
	media: File[];
	refralAndPromotions: {
		promotion: boolean;
		affiliate: boolean;
		termsAndCondtions: boolean;
		privacyPolicy: boolean;
	};
};

export type ImageUrls = {
	name: string;
	url: string;
}[];

const ProjectForm = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [imageUrls, setImageUrls] = useState<ImageUrls>([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const [projectImage, setProjectImage] = useState<File | null>(null);

	const handleSingleImageUpload = async (file: File) => {
		const options: Options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};
		try {
			const compressedFile = await imageCompression(file, options);
			// console.log('Image uploaded:', compressedFile.name);

			return compressedFile;
		} catch (error) {
			// console.log('Failed to upload image:', error);
		}
	};

	const onSubmit = (data: FormData) => {
		// console.log('Form Data:', data);
	};

	const handleImageUpload = async (file: File) => {
		const options: Options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};
		try {
			const compressedFile = await imageCompression(file, options);
			setImageUrls((prevFiles) => [
				...prevFiles,
				{
					name: compressedFile.name,
					url: URL.createObjectURL(compressedFile), // Use object URL for preview
				},
			]);
			setFiles((prevFiles) => [...prevFiles, compressedFile]);
		} catch (error) {
			// console.log('Failed to upload image');
		}
	};

	return (
		<Flex flexDirection={'column'} gap={10}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
				<Flex
					flexDirection={'column'}
					gap={8}
					className="min-h-screen rounded-md bg-gradient-to-r from-black to-[#0C083F80]  "
					p={{ base: 8, md: 12 }}
				>
					<Box>
						<Text variant={'form'}>Add a Project</Text>
						<Text variant={'form'} fontSize={'12px'}>
							Learn how to optimize your project page to create more engagement
						</Text>
					</Box>

					<Flex flexDirection={'column'} gap={4}>
						<Flex
							gap={4}
							alignItems={'center'}
							flexDirection={{ base: 'column', md: 'row' }}
						>
							<SingleImageUpload
								image={projectImage}
								setImage={setProjectImage}
								handleImageUpload={async (file) => {
									const compressedFile = await handleSingleImageUpload(file);
									if (compressedFile) {
										setProjectImage(compressedFile);
									}
								}}
							/>
							<Flex flexDirection={'column'} gap={4} w={'100%'}>
								<Input
									variant={'unstyled'}
									px={6}
									py={4}
									bgGradient="linear(to-r, #3918804D, #0C083F4D)"
									placeholder="Does your project have smart contracts? (Is it a dapp?)*"
									{...register('isDapp', { required: 'Is required' })}
								/>
								{errors.isDapp && (
									<Text variant={'alert'}>{errors.isDapp.message}</Text>
								)}
								<Input
									variant={'unstyled'}
									px={6}
									py={4}
									bgGradient="linear(to-r, #3918804D, #0C083F4D)"
									placeholder="Has your dapp been released?*"
									{...register('isReleased', { required: 'Is required' })}
								/>
								{errors.isReleased && (
									<Text variant={'alert'}>{errors.isReleased.message}</Text>
								)}
							</Flex>
						</Flex>
						<Flex alignItems={'center'} gap={4}>
							<Text
								variant={'simple'}
								w={'188px'}
								textColor={'white'}
								textAlign={'center'}
							>
								Project Name*
							</Text>
							<Input
								variant={'unstyled'}
								px={6}
								py={4}
								bgGradient="linear(to-r, #3918804D, #0C083F4D)"
								placeholder="Project Name*"
								{...register('projectName', {
									required: 'Project Name is required',
								})}
							/>
						</Flex>
						{errors.projectName && (
							<Text variant={'alert'}>{errors.projectName.message}</Text>
						)}

						<Flex alignItems={'center'} gap={4}>
							<Text
								variant={'simple'}
								w={'188px'}
								textColor={'white'}
								textAlign={'center'}
							>
								Categories*
							</Text>
							<Input
								variant={'unstyled'}
								px={6}
								py={4}
								bgGradient="linear(to-r, #3918804D, #0C083F4D)"
								placeholder="Categories*"
								{...register('categories', { required: 'Categories are required' })}
							/>
						</Flex>
						{errors.categories && (
							<Text variant={'alert'}>{errors.categories.message}</Text>
						)}
						<Flex alignItems={'center'} gap={4}>
							<Text
								variant={'simple'}
								w={'188px'}
								textColor={'white'}
								textAlign={'center'}
							>
								Website*
							</Text>
							<Input
								variant={'unstyled'}
								px={6}
								py={4}
								bgGradient="linear(to-r, #3918804D, #0C083F4D)"
								placeholder="Website*"
								{...register('website', { required: 'Website is required' })}
							/>
						</Flex>
						{errors.website && <Text variant={'alert'}>{errors.website.message}</Text>}
						<Flex alignItems={'center'} gap={4}>
							<Text
								variant={'simple'}
								w={'188px'}
								textColor={'white'}
								textAlign={'center'}
							>
								Short description**
							</Text>
							<Input
								variant={'unstyled'}
								px={6}
								py={4}
								bgGradient="linear(to-r, #3918804D, #0C083F4D)"
								placeholder="Short Description*"
								{...register('shortDescription', {
									required: 'Short Description is required',
								})}
							/>
						</Flex>
						{errors.shortDescription && (
							<Text variant={'alert'}>{errors.shortDescription.message}</Text>
						)}
						<Flex alignItems={'center'} gap={4}>
							<Text
								variant={'simple'}
								w={'188px'}
								textColor={'white'}
								textAlign={'center'}
							></Text>
							<Input
								variant={'unstyled'}
								px={6}
								py={4}
								bgGradient="linear(to-r, #3918804D, #0C083F4D)"
								placeholder="Tags*"
								{...register('tags', { required: 'Tags are required' })}
							/>
						</Flex>
						{errors.shortDescription && (
							<Text variant={'alert'}>{errors.shortDescription.message}</Text>
						)}

						<Input
							variant={'unstyled'}
							px={6}
							py={4}
							bgGradient="linear(to-r, #3918804D, #0C083F4D)"
							placeholder="Add Chains*"
							{...register('chain', { required: 'Chains are required' })}
						/>
						{errors.chain && <Text variant={'alert'}>{errors.chain.message}</Text>}

						<Textarea
							variant={'unstyled'}
							px={6}
							py={4}
							border={'none'}
							rows={15}
							bgGradient="linear(to-r, #3918804D, #0C083F4D)"
							placeholder="Full description*"
							{...register('fullDescription', {
								required: 'Full description is required',
							})}
						/>
						{errors.fullDescription && (
							<Text variant={'alert'}>{errors.fullDescription.message}</Text>
						)}

						<Flex w={'100%'} gap={5}>
							<Box w={'100%'}>
								<Input
									variant={'unstyled'}
									px={6}
									py={4}
									bgGradient="linear(to-r, #3918804D, #0C083F4D)"
									placeholder="WeChat(Developer)"
									{...register('weChat')}
								/>
							</Box>
							<Box w={'100%'}>
								<Input
									variant={'unstyled'}
									px={6}
									py={4}
									bgGradient="linear(to-r, #3918804D, #0C083F4D)"
									placeholder="Telegram(Developer)*"
									{...register('telegram')}
								/>
							</Box>
						</Flex>
					</Flex>
				</Flex>
				<Flex
					flexDirection={'column'}
					gap={8}
					className="rounded-md bg-gradient-to-r from-black to-[#0C083F80]"
					p={{ base: 8, md: 12 }}
					pb={16}
				>
					<Text variant={'form'}>Social</Text>
					<Flex w={'100%'} gap={5} flexDirection={{ base: 'column', md: 'row' }}>
						<Box w={'100%'}>
							<Input
								variant={'unstyled'}
								px={6}
								py={4}
								bgGradient="linear(to-r, #3918804D, #0C083F4D)"
								placeholder="Facebook"
								{...register('social.facebook')}
							/>
						</Box>
						<Box w={'100%'}>
							<Input
								variant={'unstyled'}
								px={6}
								py={4}
								bgGradient="linear(to-r, #3918804D, #0C083F4D)"
								placeholder="Twitter"
								{...register('social.twitter')}
							/>
						</Box>
					</Flex>
					<Flex w={'100%'} gap={5} flexDirection={{ base: 'column', md: 'row' }}>
						<Box w={'100%'}>
							<Input
								variant={'unstyled'}
								px={6}
								py={4}
								bgGradient="linear(to-r, #3918804D, #0C083F4D)"
								placeholder="Youtube"
								{...register('social.youtube')}
							/>
						</Box>
						<Box w={'100%'}>
							<Input
								variant={'unstyled'}
								px={6}
								py={4}
								bgGradient="linear(to-r, #3918804D, #0C083F4D)"
								placeholder="Tiktok"
								{...register('social.tiktok')}
							/>
						</Box>
					</Flex>
				</Flex>
				<Flex
					flexDirection={'column'}
					gap={8}
					className="rounded-md bg-gradient-to-r from-black to-[#0C083F80]"
					p={{ base: 8, md: 12 }}
					pb={16}
				>
					<Text variant={'form'}>Media</Text>
					<ImageUploadButton
						files={files}
						imageUrls={imageUrls}
						setImageUrls={setImageUrls}
						setFiles={setFiles}
						handleImageUpload={handleImageUpload}
					/>

					<Text variant={'simple'} textColor={'white'} fontSize={'15px'}>
						Images dimensions must be 1000x630px and max 5mb - jpg, jpeg, png.
						Screenshots or representative images. Maximum 3 files.
					</Text>
				</Flex>

				<Flex
					bgGradient="linear(to-r, #3918804D, #0C083F4D)"
					h={'60px'}
					w={'100%'}
					borderRadius={'md'}
				></Flex>

				<Flex
					flexDirection={'column'}
					gap={8}
					className="rounded-md bg-gradient-to-r from-black to-[#0C083F80]"
					p={{ base: 8, md: 12 }}
					pb={16}
				>
					<Text variant={'form'} fontSize={{ base: '20px', md: '36px' }}>
						Promoting your Project & Referral Programs
					</Text>

					<Box>
						<Checkbox
							{...register('refralAndPromotions.promotion')}
							colorScheme="purple"
							textColor={'#BCBCBC'}
							fontFamily={'Roboto'}
							py={2}
						>
							Are you interested in promoting and highlighting your dapp on Nonce
							Starter?
						</Checkbox>
						<Checkbox
							{...register('refralAndPromotions.affiliate')}
							colorScheme="purple"
							textColor={'#BCBCBC'}
							fontFamily={'Roboto'}
							py={2}
						>
							Does your project have an affiliate program?
						</Checkbox>
						<Checkbox
							{...register('refralAndPromotions.termsAndCondtions', {
								required: 'Please check Terms and conditions',
							})}
							colorScheme="purple"
							textColor={'#BCBCBC'}
							fontFamily={'Roboto'}
							py={2}
						>
							I&apos;ve read the Terms of use and I agree to be bound by the
							provisions indicated therein.
						</Checkbox>
						{errors.refralAndPromotions?.termsAndCondtions && (
							<Text variant={'alert'} textAlign={'left'}>
								{errors.refralAndPromotions.termsAndCondtions.message}
							</Text>
						)}
						<Checkbox
							{...register('refralAndPromotions.privacyPolicy', {
								required: 'Please check Privacy Policy',
							})}
							colorScheme="purple"
							textColor={'#BCBCBC'}
							fontFamily={'Roboto'}
							py={2}
						>
							I&apos;ve read and accept the Privacy Policy Nonce Starter
						</Checkbox>
						{errors.refralAndPromotions?.privacyPolicy && (
							<Text variant={'alert'} textAlign={'left'}>
								{errors.refralAndPromotions.privacyPolicy.message}
							</Text>
						)}
					</Box>
				</Flex>

				<Button
					variant={'solid'}
					size={'md'}
					type="submit"
					textAlign={'left'}
					py={{ base: '2', md: '8' }}
				>
					Submit a Project
				</Button>
			</form>
		</Flex>
	);
};

export default ProjectForm;
