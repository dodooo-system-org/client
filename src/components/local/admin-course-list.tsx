'use client';

import { CourseAPI } from '@/apis/course';
import { useQuery } from '@tanstack/react-query';
import { CourseCard } from '../global/course-card';
import { AdminCourseListFilter } from './admin-course-list-filter';

export const CourseList = () => {
    const { data } = useQuery({
        queryKey: ['all-courses'],
        queryFn: CourseAPI.getListCourses,
        retry: 1,
    });

    return (
        <div>
            <AdminCourseListFilter />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {data?.data.map((course, index) => (
                    <CourseCard key={index} coursePreview={course} />
                ))}
            </div>
        </div>
    );
};
