'use client';

import { CourseAPI } from '@/apis/course';
import { REACT_QUERY_KEYS } from '@/constants';
import { handleErrorToast } from '@/lib/utils';
import { Pagination, Request } from '@/types/apis/request';
import { Meta } from '@/types/apis/response';
import { StatusType } from '@/types/common';
import { Category, CoursePreview } from '@/types/objects';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Error from 'next/error';
import React, { createContext, useState } from 'react';

type FilterState = Pagination & {
    query: string;
    category: Category | null;
    level: number | null;
    status: StatusType | null;
};

type AdminCourseListContextType = {
    filter: FilterState;
    setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
    refetch: () => void;
    items: CoursePreview[];
    meta?: Meta;
    isFetching?: boolean;
};

export const AdminListCourseContext = createContext<AdminCourseListContextType>(
    {} as AdminCourseListContextType
);

export const CourseManagementProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [filter, setFilter] = useState<FilterState>({
        query: '',
        category: null,
        level: null,
        status: null,
        page: 1,
        size: 10,
    });

    const { data, refetch, isFetching } = useQuery({
        queryKey: [REACT_QUERY_KEYS.ADMIN.ALL_COURSES, filter],
        queryFn: async ({ queryKey }) => {
            try {
                const filterState = queryKey[1] as FilterState;
                const payload: Request.AdminGetListCourses = {
                    query: filterState.query.trim(),
                    categoryId:
                        filterState.category &&
                        filterState.category?.categoryId,
                    courseLevel: filterState.level,
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
                return await CourseAPI.getListCourses(payload);
            } catch (error: unknown) {
                handleErrorToast(error as Error);
            }
        },
        retry: 2,
        placeholderData: keepPreviousData,
    });

    return (
        <AdminListCourseContext.Provider
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
        </AdminListCourseContext.Provider>
    );
};
