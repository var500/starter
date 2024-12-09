'use client';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CiImageOn } from 'react-icons/ci';
import { IoIosRemoveCircle } from 'react-icons/io';
import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import type { ImageUrls } from '../Projects/AddProjectForm';

export const ImageUploadButton = ({
	max = 3,
	files,
	imageUrls,
	setFiles,
	setImageUrls,
	handleImageUpload,
}: {
	max?: number;
	files: File[];
	imageUrls: ImageUrls;
	setFiles: Dispatch<SetStateAction<File[]>>;
	setImageUrls: Dispatch<SetStateAction<ImageUrls>>;
	handleImageUpload: (file: File) => void;
}) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (
				acceptedFiles.length + files.length > max ||
				acceptedFiles.length > max ||
				files.length > max
			) {
				// eslint-disable-next-line no-console
				console.log(`Max ${max} images are allowed`);

				return;
			}
			acceptedFiles.forEach((file) => {
				handleImageUpload(file);
			});
		},
		[files.length, handleImageUpload, max]
	);

	const { getRootProps, getInputProps } = useDropzone({ maxFiles: max - files.length, onDrop });

	return (
		<>
			<div className="relative flex flex-col gap-2">
				<div
					{...getRootProps({
						className: 'dropzone items-center p-0',
					})}
				>
					{/* dropzome */}
					<div
						className={`relative mx-auto flex h-48 w-full  flex-col flex-wrap items-center justify-center    ${
							files.length > 0 ? 'p-2' : 'p-0'
						} hover:cursor-pointer `}
					>
						<input {...getInputProps()} className="h-full w-full" />
						{files.length === 0 && (
							<>
								<Flex gap={4} wrap={'wrap'}>
									{Array.from({ length: max }).map((_, index) => (
										<Flex
											key={index}
											height={{ base: '100px', md: '150px', lg: '174px' }}
											w={{ base: '100px', md: '150px', lg: '240px' }}
											bg={'#06083D'}
											alignItems={'center'}
											flexDirection={'column'}
											justifyContent={'center'}
										>
											<CiImageOn size={33} color="#4D3D70" />
											<Text
												variant={'simple'}
												textColor={'white'}
												maxW={'100px'}
												textAlign={'center'}
											>
												Drag & drop your file here
											</Text>
										</Flex>
									))}
								</Flex>
							</>
						)}
					</div>
				</div>
				<div className=" absolute -top-0 left-0 z-10 md:px-7">
					<div className="mt-4 flex  flex-row gap-2 overflow-auto overflow-y-hidden ">
						{imageUrls.map((item, index) => (
							<div key={index} className="relative">
								<Image
									src={item.url}
									alt={`Image ${index}`}
									height={250}
									width={250}
									objectFit="cover"
									quality={100}
									className="h-40 w-40 rounded object-cover shadow"
								/>
								<IoIosRemoveCircle
									size={24}
									className="absolute right-0 top-0 cursor-pointer rounded-full bg-white p-0 text-rose-600 hover:bg-gray-300 hover:text-red-900"
									onClick={() => {
										setImageUrls((prevFiles) =>
											prevFiles.filter((f) => f.url !== item.url)
										);
										setFiles((prevFiles) =>
											prevFiles.filter((f) => f.name !== item.name)
										);
									}}
								/>
							</div>
						))}
					</div>
				</div>
				<span className="w-full text-center text-sm font-medium mt-10 md:mt-0">
					{files.length > 3 || files.length === 0 ? (
						<p className="text-red-500">Max 3 images are allowed</p>
					) : (
						<p>{`Number of files selected: ${files.length} out of 4 maximum.`}</p>
					)}
				</span>
			</div>
		</>
	);
};
