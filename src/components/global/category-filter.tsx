'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { CategoryAPI } from '@/apis/category';
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
import { cn } from '@/lib/utils';
import { Category } from '@/types/objects';
import { useQuery } from '@tanstack/react-query';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export type CategoryFilterRef = {
    getCategory: () => Category | undefined;
};

export const CategoryFilter = forwardRef(({}, ref) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const { data: categories = [] } = useQuery({
        queryKey: ['all-categories'],
        queryFn: CategoryAPI.getListAvailableCategories,
        retry: 1,
    });

    useImperativeHandle(ref, (): CategoryFilterRef => {
        return {
            getCategory: () => categories.find(c => c.categoryName === value),
        };
    }, [value, categories]);

    const triggerRef = useRef<HTMLButtonElement>(null);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    ref={triggerRef}
                >
                    {value ? (
                        value
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
                                    onSelect={currentValue => {
                                        setValue(
                                            currentValue === value
                                                ? ''
                                                : currentValue
                                        );
                                        setOpen(false);
                                    }}
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
