'use client';

import { categoryAPI } from '@/apis/category';
import { REACT_QUERY_KEYS } from '@/constants';
import { handleErrorToast } from '@/lib/utils';
import { createCategorySchema } from '@/lib/validation-schemas';
import { Pagination, Request } from '@/types/apis/request';
import { Meta } from '@/types/apis/response';
import { StatusType } from '@/types/common';
import { Category, TimeStampBase } from '@/types/objects';
import { useMutation, useQuery } from '@tanstack/react-query';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import { createContext, useState } from 'react';
import z from 'zod';

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
    onCreate?: (data: z.infer<typeof createCategorySchema>) => Promise<void>;
    onEdit?: (
        data: Omit<Category, keyof TimeStampBase['createdAt']>
    ) => Promise<void>;
    onUpdate?: (data: Request.Category.UpdateCategory) => Promise<void>;
    onActivate?: (
        categoryId: string,
        currentCategory: Category
    ) => Promise<void>;
    onDeactivate?: (
        categoryId: string,
        currentCategory: Category
    ) => Promise<void>;
    onDelete?: (categoryId: string, currentCategory: Category) => Promise<void>;
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
    const pathname = usePathname();
    const [filter, setFilter] = useState<FilterState>({
        page: 1,
        size: 10,
        query: '',
    });

    const { data, refetch, isFetching } = useQuery({
        queryKey: [REACT_QUERY_KEYS.ADMIN.ALL_CATEGORIES, filter],
        queryFn: ({ queryKey }) => {
            try {
                const filterState = queryKey[1] as FilterState;
                const payload: Request.Category.AdminGetListCategories = {
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
                return categoryAPI.getListCategories(payload);
            } catch (error: unknown) {
                handleErrorToast(error as Error);
            }
        },
        enabled: !!pathname && pathname === '/admin/categories', // Only run query if pathname is defined
    });

    const createCategoryMutation = useMutation({
        mutationFn: categoryAPI.createCategory,
        onSuccess: () => {
            refetch();
        },
        onError: (error: unknown) => {
            throw error;
        },
    });

    const editCategoryMutation = useMutation({
        mutationFn: categoryAPI.updateCategory,
        onSuccess: () => {
            refetch();
        },
        onError: (error: unknown) => {
            throw error;
        },
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

    const onCreate = async (data: z.infer<typeof createCategorySchema>) => {
        await createCategoryMutation.mutateAsync({
            categoryName: data.categoryName,
            categoryDescription: data.categoryDescription,
            categoryImageUrl: data.categoryImageUrl,
        });
    };

    const onEdit = async (
        data: Omit<Category, keyof TimeStampBase['createdAt']>
    ) => {
        await editCategoryMutation.mutateAsync(data);
    };

    const onUpdate = async (data: Request.Category.UpdateCategory) => {
        await updateCategoryMutation.mutateAsync(data);
    };

    const onActivate = async (
        categoryId: string,
        currentCategory: Category
    ) => {
        // Prevent activation if category is deleted
        if (currentCategory.isDeleted) {
            const error = new globalThis.Error(
                'Cannot activate a deleted category'
            );
            throw error;
        }
        await editCategoryMutation.mutateAsync({
            ...currentCategory,
            categoryId,
            isActive: true, // Set to active
        });
    };

    const onDeactivate = async (
        categoryId: string,
        currentCategory: Category
    ) => {
        // Prevent deactivation if category is deleted
        if (currentCategory.isDeleted) {
            const error = new globalThis.Error(
                'Cannot deactivate a deleted category'
            );
            throw error;
        }
        await editCategoryMutation.mutateAsync({
            ...currentCategory,
            categoryId,
            isActive: false, // Set to inactive
        });
    };

    const onDelete = async (categoryId: string, currentCategory: Category) => {
        // Prevent double deletion
        if (currentCategory.isDeleted) {
            const error = new globalThis.Error('Category is already deleted');
            throw error;
        }
        await editCategoryMutation.mutateAsync({
            ...currentCategory,
            categoryId,
            isDeleted: true, // Mark as deleted
        });
    };

    return (
        <AdminCategoryListContext.Provider
            value={{
                filter,
                setFilter,
                refetch,
                items: data?.data || [],
                meta: data?.meta,
                isFetching: isFetching,
                onCreate,
                onEdit,
                onUpdate,
                onActivate,
                onDeactivate,
                onDelete,
            }}
        >
            {children}
        </AdminCategoryListContext.Provider>
    );
};
