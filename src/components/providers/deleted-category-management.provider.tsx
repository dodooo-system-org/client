'use client';

import { categoryAPI } from '@/apis/category';
import { REACT_QUERY_KEYS } from '@/constants';
import { handleErrorToast } from '@/lib/utils';
import { Pagination, Request } from '@/types/apis/request';
import { Meta } from '@/types/apis/response';
import { Category } from '@/types/objects';
import { useMutation, useQuery } from '@tanstack/react-query';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import { createContext, useState } from 'react';

type DeletedCategoryFilterState = Pagination & {
    query?: string;
    startDate?: Date;
    endDate?: Date;
};

type AdminDeletedCategoryListContextType = {
    filter: DeletedCategoryFilterState;
    setFilter: React.Dispatch<React.SetStateAction<DeletedCategoryFilterState>>;
    refetch: () => void;
    items: Category[];
    meta?: Meta;
    isFetching?: boolean;
    onUpdate?: (data: Request.Category.UpdateCategory) => Promise<void>;
    onRestore?: (
        categoryId: string,
        currentCategory: Category
    ) => Promise<void>;
};

export const AdminDeletedCategoryListContext =
    createContext<AdminDeletedCategoryListContextType>(
        {} as AdminDeletedCategoryListContextType
    );

export const AdminDeletedCategoryListProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const pathname = usePathname();
    const [filter, setFilter] = useState<DeletedCategoryFilterState>({
        page: 1,
        size: 10,
        query: '',
    });

    const { data, refetch, isFetching } = useQuery({
        queryKey: [REACT_QUERY_KEYS.ADMIN.DELETED_CATEGORIES, filter],
        queryFn: ({ queryKey }) => {
            try {
                const filterState = queryKey[1] as DeletedCategoryFilterState;
                const payload: Request.AdminGetDeletedCategories = {
                    query: filterState.query?.trim(),
                    startDate: filterState.startDate,
                    endDate: filterState.endDate,
                    page: filterState.page,
                    size: filterState.size,
                };
                return categoryAPI.getDeletedCategory(payload);
            } catch (error: unknown) {
                handleErrorToast(error as Error);
            }
        },
        enabled: !!pathname && pathname === '/admin/categories/delete', // Only run query if pathname is defined
    });

    const updateCategoryMutation = useMutation({
        mutationFn: categoryAPI.updateCategory,
        onSuccess: () => {
            refetch();
        },
        onError: (error: unknown) => {
            throw error;
        },
    });

    const onUpdate = async (data: Request.Category.UpdateCategory) => {
        await updateCategoryMutation.mutateAsync(data);
    };

    const onRestore = async (categoryId: string, currentCategory: Category) => {
        // Only allow restoring deleted categories
        if (!currentCategory.isDeleted) {
            const error = new globalThis.Error('Category is not deleted');
            throw error;
        }
        await updateCategoryMutation.mutateAsync({
            ...currentCategory,
            categoryId,
            isDeleted: false, // Restore from deleted state
        });
    };

    return (
        <AdminDeletedCategoryListContext.Provider
            value={{
                filter,
                setFilter,
                refetch,
                items: data?.data || [],
                meta: data?.meta,
                isFetching: isFetching,
                onUpdate,
                onRestore,
            }}
        >
            {children}
        </AdminDeletedCategoryListContext.Provider>
    );
};

export type { AdminDeletedCategoryListContextType, DeletedCategoryFilterState };
