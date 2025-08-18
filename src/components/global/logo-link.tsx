import Link from 'next/link';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ImageWithPlaceholder } from './ImageWithPlaceholder';

type LogoLinkProps = {
    target?: HTMLAttributeAnchorTarget;
    size?: 'sm' | 'md' | 'lg';
};

export const LogoLink = memo(
    ({ target = '_self', size = 'md' }: LogoLinkProps) => {
        const sizeClasses = {
            sm: 'h-10 w-10',
            md: 'h-14 w-14',
            lg: 'h-16 w-16',
        };
        return (
            <Link href="/" target={target}>
                <ImageWithPlaceholder
                    src="/logo.jpg"
                    alt="Logo"
                    className={sizeClasses[size]}
                    height={100}
                    width={100}
                />
            </Link>
        );
    }
);

LogoLink.displayName = 'LogoLink';
