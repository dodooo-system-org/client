'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useId, useRef } from 'react';
import { CategoryFilter, CategoryFilterRef } from '../global/category-filter';

export const AdminCourseListFilter = () => {
    const inputId = useId();
    const categoryFilterRef = useRef<CategoryFilterRef>(null);

    return (
        <div className="grid grid-cols-10 gap-2 py-4 xl:grid-cols-12">
            {/* Search input */}
            <div className="relative col-span-10 md:col-span-10 xl:col-span-3">
                <Label htmlFor={inputId} className="sr-only">
                    Search
                </Label>
                <Input
                    id={inputId}
                    type="search"
                    placeholder="Search name course..."
                    className="pl-8 text-sm"
                />
                <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </div>
            {/* Category filter */}
            <div className="col-span-10 md:col-span-4 xl:col-span-2">
                <CategoryFilter ref={categoryFilterRef} />
            </div>
            {/* Course level filter */}
            <div className="col-span-5 md:col-span-3 xl:col-span-2">
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select level..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">Beginner</SelectItem>
                        <SelectItem value="1">Intermediate</SelectItem>
                        <SelectItem value="2">Advanced</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {/* Course status filter */}
            <div className="col-span-5 md:col-span-3 xl:col-span-2">
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="deleted">Deleted</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
