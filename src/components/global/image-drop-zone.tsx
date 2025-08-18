'use client';

import { cn } from '@/lib/utils';
import { ImageUp } from 'lucide-react';
import { Fragment, memo, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AspectRatio } from '../ui/aspect-ratio';
import { Input } from '../ui/input';
import { ImageWithPlaceholder } from './ImageWithPlaceholder';

type ImageDropZoneProps = {
    initialImageSrc?: string;
    onImageDrop?: (imageSrc: string) => void;
    onUploadUrl?: (file: File) => Promise<string>;
    ratio: number;
    isErrored?: boolean;
};

export const ImageDropZone = memo(
    ({
        ratio = 16 / 8,
        onImageDrop,
        onUploadUrl,
        initialImageSrc,
        isErrored,
    }: ImageDropZoneProps) => {
        const [imageSrc, setImageSrc] = useState<string | null>(
            initialImageSrc || null
        );

        const inputFileRef = useRef<HTMLInputElement>(null);

        // Reset the file input when initialImageSrc becomes empty/undefined
        useEffect(() => {
            if (!initialImageSrc && inputFileRef.current) {
                inputFileRef.current.value = '';
            }
            setImageSrc(initialImageSrc || null);
        }, [initialImageSrc]);

        const handleOpenFileDialog = () => {
            inputFileRef.current?.click();
        };

        const handleImageProcessing = async (file: File) => {
            const toastId = toast.loading('Processing image...');
            try {
                if (file && file.type.startsWith('image/')) {
                    if (onUploadUrl) {
                        const uploadUrl = await onUploadUrl(file);
                        setImageSrc(uploadUrl);
                        onImageDrop?.(uploadUrl);
                    } else {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            if (onImageDrop) {
                                onImageDrop(reader.result as string);
                            }
                            setImageSrc(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                    }
                }
                toast.update(toastId, {
                    render: 'Image processed successfully',
                    type: 'success',
                    isLoading: false,
                    autoClose: 2000,
                });
            } catch {
                toast.update(toastId, {
                    render: 'Failed to process image',
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000,
                });
                setImageSrc(initialImageSrc || null);
                onImageDrop?.('');
            }
        };

        const handleFileChange = async (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            const file = event.target.files?.[0];
            if (file) {
                handleImageProcessing(file);
            }
            event.target.value = ''; // Reset input value to allow re-uploading the same file
        };

        const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            if (file) {
                handleImageProcessing(file);
            }
        };
        return (
            <AspectRatio
                ratio={ratio}
                role="img"
                onClick={handleOpenFileDialog}
                style={
                    !imageSrc
                        ? {
                              backgroundImage: isErrored
                                  ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%23e7000b' stroke-width='2' stroke-dasharray='14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
                                  : `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%23cccccc' stroke-width='2' stroke-dasharray='14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                              borderRadius: '4px',
                          }
                        : {}
                }
                className={cn(
                    'flex h-full w-full cursor-pointer flex-col items-center justify-center'
                )}
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
            >
                {imageSrc ? (
                    <ImageWithPlaceholder
                        src={imageSrc}
                        alt="Uploaded"
                        className="mt-2 h-full w-full rounded-lg border object-cover object-center"
                        height={100}
                        width={ratio * 100}
                    />
                ) : (
                    <Fragment>
                        <ImageUp className="text-input h-20 w-20" />
                        <div className="text-muted-foreground text-sm font-light">
                            Drag and drop an image here or click to upload
                        </div>
                    </Fragment>
                )}
                <Input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    placeholder="Upload category image"
                    onChange={handleFileChange}
                    ref={inputFileRef}
                />
            </AspectRatio>
        );
    }
);

ImageDropZone.displayName = 'ImageDropZone';
