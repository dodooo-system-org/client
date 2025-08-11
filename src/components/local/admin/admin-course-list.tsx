'use client';

import { CourseCard } from '@/components/global/course-card';
import { PrimaryPagination } from '@/components/global/paginations/primary-pagination';
import { CardSkeleton } from '@/components/global/skeletons/card-skeleton';
import { AdminListCourseContext } from '@/components/providers/course-management.provider';
import { useContext } from 'react';
import { AdminCourseListFilter } from './admin-course-list-filter';

export const CourseList = () => {
    const { setFilter, items, meta, isFetching } = useContext(
        AdminListCourseContext
    );

    return (
        <div className="space-y-8">
            <AdminCourseListFilter />
            <PrimaryPagination
                meta={{
                    page: meta?.page,
                    totalPages: meta?.totalPages,
                    hasNext: meta?.hasNext,
                    hasPrevious: meta?.hasPrevious,
                    totalCount: meta?.totalCount,
                }}
                onPageChange={page => {
                    setFilter(prev => ({ ...prev, page }));
                }}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {isFetching ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <CardSkeleton key={index} />
                    ))
                ) : items?.length ? (
                    items?.map((course, index) => (
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
                    page: meta?.page,
                    totalPages: meta?.totalPages,
                    hasNext: meta?.hasNext,
                    hasPrevious: meta?.hasPrevious,
                    totalCount: meta?.totalCount,
                }}
                onPageChange={page => {
                    setFilter(prev => ({ ...prev, page }));
                }}
            />
        </div>
    );
};
