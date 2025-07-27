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
import { CourseStatusType } from '@/types/common';
import { Search } from 'lucide-react';
import { useContext, useEffect, useId, useState } from 'react';
import { CategoryFilter } from '../../global/category-filter';
import { AdminListCourseContext } from './admin-course-list';

export const AdminCourseListFilter = () => {
    const { filter, setFilter } = useContext(AdminListCourseContext);
    const [search, setSearch] = useState('');

    const inputId = useId();

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilter(prev => ({ ...prev, query: search }));
        }, 700); // Debounce for 700ms

        return () => clearTimeout(handler);
    }, [search]);

    return (
        <div className="grid grid-cols-10 gap-2 xl:grid-cols-12">
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
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </div>
            {/* Category filter */}
            <div className="col-span-10 md:col-span-4 xl:col-span-2">
                <CategoryFilter
                    onSelectedCategory={category =>
                        setFilter(prev => ({
                            ...prev,
                            category: category || null,
                        }))
                    }
                />
            </div>
            {/* Course level filter */}
            <div className="col-span-5 md:col-span-3 xl:col-span-2">
                <Select
                    value={filter.level?.toString()}
                    onValueChange={level =>
                        setFilter(prev => ({ ...prev, level: Number(level) }))
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select level..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">Beginner</SelectItem>
                        <SelectItem value="1">Intermediate</SelectItem>
                        <SelectItem value="2">Advanced</SelectItem>
                        <SelectItem value="3">Expert</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {/* Course status filter */}
            <div className="col-span-5 md:col-span-3 xl:col-span-2">
                <Select
                    value={filter.status?.toString()}
                    onValueChange={status =>
                        setFilter(prev => ({
                            ...prev,
                            status: status as CourseStatusType | null,
                        }))
                    }
                >
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
