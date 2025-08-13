'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { categoryAPI } from '@/apis/category';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { REACT_QUERY_KEYS } from '@/constants';
import { cn } from '@/lib/utils';
import { Category } from '@/types/objects';
import { useQuery } from '@tanstack/react-query';
import { memo, useEffect, useRef, useState } from 'react';

type CategoryFilterProps = {
    initValue?: Category | undefined;
    onSelectedCategory?: (category: Category | undefined) => void;
    isError?: boolean;
};

export const AvailableCategorySelect = memo((props: CategoryFilterProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(props.initValue?.categoryName || '');

    const { data: categories = [] } = useQuery({
        queryKey: [REACT_QUERY_KEYS.ADMIN.AVAILABLE_CATEGORIES],
        queryFn: categoryAPI.getListAvailableCategories,
        retry: 1,
    });

    const triggerRef = useRef<HTMLButtonElement>(null);

    // Reset value when categories change or initValue changes
    useEffect(() => {
        setValue(props.initValue?.categoryName || '');
    }, [props.initValue?.categoryName]);

    const handleSelectItem = (currentValue: string) => {
        setValue(currentValue === value ? '' : currentValue);
        if (props?.onSelectedCategory) {
            props.onSelectedCategory(
                currentValue === value
                    ? undefined
                    : categories.find(c => c.categoryName === currentValue)
            );
        }
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'w-full justify-between',
                        props.isError
                            ? 'border-red-600 hover:border-red-600'
                            : ''
                    )}
                    ref={triggerRef}
                >
                    {value ? (
                        <span className="line-clamp-1">{value}</span>
                    ) : (
                        <span className="text-muted-foreground font-normal">
                            Select category...
                        </span>
                    )}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="p-0"
                style={{ width: `${triggerRef.current?.offsetWidth}px` }}
            >
                <Command>
                    <CommandInput
                        placeholder="Search category..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map(category => (
                                <CommandItem
                                    key={category.categoryId}
                                    value={category.categoryName}
                                    onSelect={handleSelectItem}
                                >
                                    {category.categoryName}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value === category.categoryName
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
});

AvailableCategorySelect.displayName = 'AvailableCategorySelect';
