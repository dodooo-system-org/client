'use client';

import { CategoryAPI } from '@/apis/category';
import { REACT_QUERY_KEYS } from '@/constants';
import { handleErrorToast } from '@/lib/utils';
import { Pagination, Request } from '@/types/apis/request';
import { Meta } from '@/types/apis/response';
import { StatusType } from '@/types/common';
import { Category } from '@/types/objects';
import { useQuery } from '@tanstack/react-query';
import Error from 'next/error';
import { createContext, useState } from 'react';

type FilterState = Pagination & {
    query?: string;
    status?: StatusType;
    sortBy?: string;
};
type AdminCategoryListContextType = {
    filter: FilterState;
    setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
    refetch: () => void;
    items: (Category & { appliedInCoursesCount: number })[];
    meta?: Meta;
    isFetching?: boolean;
};

export const AdminCategoryListContext =
    createContext<AdminCategoryListContextType>(
        {} as AdminCategoryListContextType
    );

export const AdminCategoryListProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [filter, setFilter] = useState<FilterState>({
        page: 1,
        size: 10,
    });

    const { data, refetch, isFetching } = useQuery({
        queryKey: [REACT_QUERY_KEYS.ADMIN.ALL_CATEGORIES, filter],
        queryFn: ({ queryKey }) => {
            try {
                const filterState = queryKey[1] as FilterState;
                const payload: Request.AdminGetListCategories = {
                    query: filterState.query?.trim(),
                    isActive:
                        filterState.status === 'active'
                            ? true
                            : filterState.status === 'inactive'
                              ? false
                              : null,
                    isDeleted: filterState.status === 'deleted' ? true : null,
                    page: filterState.page,
                    size: filterState.size,
                };
                return CategoryAPI.getListCategories(payload);
            } catch (error: unknown) {
                handleErrorToast(error as Error);
            }
        },
    });
    return (
        <AdminCategoryListContext.Provider
            value={{
                filter,
                setFilter,
                refetch,
                items: data?.data || [],
                meta: data?.meta,
                isFetching: isFetching,
            }}
        >
            {children}
        </AdminCategoryListContext.Provider>
    );
};
1;
