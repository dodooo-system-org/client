'use client';

import { cn } from '@/lib/utils';
import { ImageUp } from 'lucide-react';
import Image from 'next/image';
import { Fragment, useRef, useState } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import { Input } from '../ui/input';

type ImageDropZoneProps = {
    onImageDrop?: (imageSrc: string) => void;
    ratio: number;
};

export const ImageDropZone = ({ ratio, onImageDrop }: ImageDropZoneProps) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleOpenFileDialog = () => {
        inputFileRef.current?.click();
    };

    const handleImageProcessing = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (onImageDrop) {
                    onImageDrop(reader.result as string);
                }
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            ratio={16 / 8}
            role="img"
            onClick={handleOpenFileDialog}
            className={cn(
                'flex h-full w-full cursor-pointer flex-col items-center justify-center',
                !imageSrc ? 'border-long-dashed' : ''
            )}
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
        >
            {imageSrc ? (
                <Image
                    src={imageSrc}
                    alt="Uploaded"
                    className="mt-2 h-full w-full rounded-lg border object-cover object-center"
                    height={ratio * 100}
                    width={100}
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
};
