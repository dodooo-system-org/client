import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { memo } from 'react';

interface RatingProps {
    value: number;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export const Rating = memo(
    ({ value, size = 'medium', className = '' }: RatingProps) => {
        const roundedValue = Math.ceil(value);
        return (
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                        key={index}
                        className={cn(
                            index < roundedValue
                                ? 'fill-third text-third'
                                : 'fill-accent text-accent',
                            {
                                'h-3 w-3': size === 'small',
                                'h-4 w-4': size === 'medium',
                                'h-5 w-5': size === 'large',
                            },
                            className
                        )}
                    />
                ))}
            </div>
        );
    }
);

Rating.displayName = 'Rating';
