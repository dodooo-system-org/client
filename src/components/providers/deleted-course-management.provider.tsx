'use client';

import { courseAPI } from '@/apis/course';
import { REACT_QUERY_KEYS } from '@/constants';
import { handleErrorToast } from '@/lib/utils';
import { Pagination, Request } from '@/types/apis/request';
import { Meta } from '@/types/apis/response';
import { Category, CoursePreview } from '@/types/objects';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Error from 'next/error';
import { usePathname } from 'next/navigation';
import React, { createContext, useState } from 'react';

type DeletedCourseFilterState = Pagination & {
    query?: string;
    category?: Category | null;
    level?: number | null;
    startDate?: Date;
    endDate?: Date;
};

type AdminDeletedCourseListContextType = {
    filter: DeletedCourseFilterState;
    setFilter: React.Dispatch<React.SetStateAction<DeletedCourseFilterState>>;
    refetch: () => void;
    items: CoursePreview[];
    meta?: Meta;
    isFetching?: boolean;
};

export const AdminDeletedCourseListContext =
    createContext<AdminDeletedCourseListContextType>(
        {} as AdminDeletedCourseListContextType
    );

export const DeletedCourseManagementProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const pathname = usePathname();

    const [filter, setFilter] = useState<DeletedCourseFilterState>({
        query: '',
        category: null,
        level: null,
        startDate: undefined,
        endDate: undefined,
        page: 1,
        size: 10,
    });

    const { data, refetch, isFetching } = useQuery({
        queryKey: [REACT_QUERY_KEYS.ADMIN.DELETED_COURSES, filter],
        queryFn: async ({ queryKey }) => {
            try {
                const filterState = queryKey[1] as DeletedCourseFilterState;
                const payload: Request.AdminGetDeletedCourse = {
                    query: filterState.query?.trim(),
                    categoryId:
                        (filterState.category &&
                            filterState.category?.categoryId) ||
                        null,
                    courseLevel: filterState.level ?? null,
                    startDate: filterState.startDate,
                    endDate: filterState.endDate,
                    page: filterState.page,
                    size: filterState.size,
                };
                return await courseAPI.getDeletedCourses(payload);
            } catch (error: unknown) {
                handleErrorToast(error as Error);
            }
        },
        retry: 2,
        placeholderData: keepPreviousData,
        enabled: pathname === '/admin/courses/delete',
    });

    return (
        <AdminDeletedCourseListContext.Provider
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
        </AdminDeletedCourseListContext.Provider>
    );
};

export type { AdminDeletedCourseListContextType, DeletedCourseFilterState };
