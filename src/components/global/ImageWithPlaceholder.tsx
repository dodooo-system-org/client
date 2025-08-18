'use client';

import Image, { ImageProps } from 'next/image';
import { memo, useState } from 'react';

export const ImageWithPlaceholder = memo((props: ImageProps) => {
    const [imageValues, setImageValues] = useState({
        src: props.src ?? '/error-image-placeholder.svg',
        alt: props.alt ?? 'image-error',
    });
    return (
        <Image
            {...props}
            src={imageValues.src}
            alt={imageValues.alt}
            placeholder="blur"
            blurDataURL="/error-image-placeholder.svg"
            onError={() => {
                setImageValues({
                    src: '/error-image-placeholder.svg',
                    alt: 'image-error',
                });
            }}
        />
    );
});

ImageWithPlaceholder.displayName = 'ImageWithPlaceholder';
