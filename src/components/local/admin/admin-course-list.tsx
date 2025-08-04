'use client';

import { CourseAPI } from '@/apis/course';
import { CourseCard } from '@/components/global/course-card';
import { PrimaryPagination } from '@/components/global/paginations/primary-pagination';
import { CardSkeleton } from '@/components/global/skeletons/card-skeleton';
import { REACT_QUERY_KEYS } from '@/constants';
import { handleErrorToast } from '@/lib/utils';
import { Pagination, Request } from '@/types/apis/request';
import { CourseStatusType } from '@/types/common';
import { Category } from '@/types/objects';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Error from 'next/error';
import { createContext, useState } from 'react';
import { AdminCourseListFilter } from './admin-course-list-filter';

export const AdminListCourseContext = createContext<AdminCourseListContextType>(
    {} as AdminCourseListContextType
);
type FilterState = {
    query: string;
    category: Category | null;
    level: number | null;
    status: CourseStatusType | null;
};

type AdminCourseListContextType = {
    filter: FilterState;
    setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
    refreshListCourse: () => void;
};
export const CourseList = () => {
    const [filter, setFilter] = useState<FilterState>({
        query: '',
        category: null,
        level: null,
        status: null,
    });

    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        size: 10,
    });

    const { data, isFetching, refetch } = useQuery({
        queryKey: [REACT_QUERY_KEYS.ADMIN.ALL_COURSES, filter, pagination],
        queryFn: async ({ queryKey }) => {
            try {
                const filterState = queryKey[1] as FilterState;
                const paginationState = queryKey[2] as Pagination;
                const payload: Request.AdminGetListCourses = {
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
                    page: paginationState.page,
                    size: paginationState.size,
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
            value={{ filter, setFilter, refreshListCourse: refetch }}
        >
            <div className="space-y-8">
                <AdminCourseListFilter />
                <PrimaryPagination
                    meta={{
                        page: pagination.page,
                        totalPages: data?.meta.totalPages,
                        hasNext: data?.meta.hasNext,
                        hasPrevious: data?.meta.hasPrevious,
                        totalCount: data?.meta.totalCount,
                    }}
                    onPageChange={page => {
                        setPagination(prev => ({ ...prev, page }));
                    }}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {isFetching ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <CardSkeleton key={index} />
                        ))
                    ) : data?.data.length ? (
                        data?.data.map((course, index) => (
                            <CourseCard key={index} coursePreview={course} />
                        ))
                    ) : (
                        <p className="text-muted-foreground col-span-full py-20 text-center text-sm italic">
                            No courses found.
                        </p>
                    )}
                </div>
                <PrimaryPagination
                    meta={{
                        page: pagination.page,
                        totalPages: data?.meta.totalPages,
                        hasNext: data?.meta.hasNext,
                        hasPrevious: data?.meta.hasPrevious,
                        totalCount: data?.meta.totalCount,
                    }}
                    onPageChange={page => {
                        setPagination(prev => ({ ...prev, page }));
                    }}
                />
            </div>
        </AdminListCourseContext.Provider>
    );
};
