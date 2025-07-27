import { Meta } from '@/types/apis/response';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPageNumbers(meta: Meta) {
    const rangeWithDots: Array<number | string> = [];
    const { page, totalPages } = meta;

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) rangeWithDots.push(i);
    } else {
        if (page > 3) rangeWithDots.push(1, 'ellipsis');
        for (
            let i = Math.max(1, page - 1);
            i <= Math.min(page + 1, totalPages);
            i++
        )
            rangeWithDots.push(i);
        if (page < totalPages - 2) rangeWithDots.push('ellipsis', totalPages);
    }

    return rangeWithDots;
}
