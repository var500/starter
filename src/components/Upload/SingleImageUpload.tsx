import { CiImageOn } from 'react-icons/ci';
import { IoIosRemoveCircle } from 'react-icons/io';
import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

export const SingleImageUpload = ({
	image,
	setImage,
	handleImageUpload,
}: {
	image: File | null;
	setImage: (file: File | null) => void;
	handleImageUpload: (file: File) => void;
}) => {
	const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || event.target.files.length === 0) return;

		const file = event.target.files[0];
		handleImageUpload(file);
		setImage(file);
	};

	return (
		<Flex
			height="135px"
			width="188px"
			position="relative"
			bg={image ? 'black' : '#06083D'}
			alignItems="center"
			justifyContent="center"
			flexDirection="column"
			gap={2}
		>
			{image ? (
				<div className="relative ">
					<Image
						src={URL.createObjectURL(image)}
						alt="Project Image"
						height={135}
						width={188}
						className="rounded object-cover h-full w-full"
					/>
					<IoIosRemoveCircle
						size={24}
						className="absolute right-0 top-0 cursor-pointer rounded-full bg-white p-0 text-rose-600 hover:bg-gray-300 hover:text-red-900"
						onClick={() => setImage(null)}
					/>
				</div>
			) : (
				<>
					<CiImageOn size={33} color="#4D3D70" />
					<Text textColor="white">Upload a Project Image</Text>
					<input
						type="file"
						accept="image/*"
						onChange={onFileChange}
						className="absolute opacity-0 h-full w-full cursor-pointer"
					/>
				</>
			)}
		</Flex>
	);
};
