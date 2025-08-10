import { StatusSelect } from '@/components/global/status-select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StatusType } from '@/types/common';
import { Search } from 'lucide-react';
import { memo, useContext, useEffect, useState } from 'react';
import { AdminCategoryListContext } from './admin-category-list';

export const AdminCategoryListFilter = memo(() => {
    const { filter, setFilter } = useContext(AdminCategoryListContext);

    const [search, setSearch] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilter(prev => ({ ...prev, query: search }));
        }, 700); // Debounce for 700ms

        return () => clearTimeout(handler);
    }, [search, setFilter]);

    return (
        <div className="grid grid-cols-12 gap-2">
            <div className="relative col-span-3 md:col-span-10 xl:col-span-3">
                <Label className="sr-only">Search</Label>
                <Input
                    type="search"
                    placeholder="Search category..."
                    className="pl-8 text-sm"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </div>
            <div className="col-span-2">
                <StatusSelect
                    value={filter.status as StatusType | null}
                    onValueChange={status =>
                        setFilter(prev => ({
                            ...prev,
                            status: status as StatusType,
                        }))
                    }
                />
            </div>
        </div>
    );
});

AdminCategoryListFilter.displayName = 'AdminCategoryListFilter';
