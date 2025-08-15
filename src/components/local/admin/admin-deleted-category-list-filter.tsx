'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdminDeletedCategoryList } from '@/hooks/use-category-context';
import { Calendar, Search } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

export const AdminDeletedCategoryListFilter = () => {
    const { setFilter } = useAdminDeletedCategoryList();
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const searchInputId = useId();
    const startDateInputId = useId();
    const endDateInputId = useId();

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilter(prev => ({ ...prev, query: search, page: 1 }));
        }, 700); // Debounce for 700ms

        return () => clearTimeout(handler);
    }, [search, setFilter]);

    // Update startDate filter
    useEffect(() => {
        setFilter(prev => ({
            ...prev,
            startDate: startDate ? new Date(startDate) : undefined,
            page: 1,
        }));
    }, [startDate, setFilter]);

    // Update endDate filter
    useEffect(() => {
        setFilter(prev => ({
            ...prev,
            endDate: endDate ? new Date(endDate) : undefined,
            page: 1,
        }));
    }, [endDate, setFilter]);

    return (
        <div className="grid grid-cols-12 gap-2">
            {/* Search input */}
            <div className="relative col-span-12 md:col-span-6 xl:col-span-4">
                <Label htmlFor={searchInputId} className="sr-only">
                    Search
                </Label>
                <Input
                    id={searchInputId}
                    type="search"
                    placeholder="Search deleted categories..."
                    className="pl-8 text-sm"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </div>

            {/* Start Date filter */}
            <div className="relative col-span-6 md:col-span-3 xl:col-span-2">
                <Label htmlFor={startDateInputId} className="sr-only">
                    Start Date
                </Label>
                <Input
                    id={startDateInputId}
                    type="date"
                    placeholder="Start date"
                    className="pl-8 text-sm"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                />
                <Calendar className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </div>

            {/* End Date filter */}
            <div className="relative col-span-6 md:col-span-3 xl:col-span-2">
                <Label htmlFor={endDateInputId} className="sr-only">
                    End Date
                </Label>
                <Input
                    id={endDateInputId}
                    type="date"
                    placeholder="End date"
                    className="pl-8 text-sm"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                />
                <Calendar className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </div>
        </div>
    );
};
