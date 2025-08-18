'use client';

import { AdminListCourseContext } from '@/components/providers/course-management.provider';
import { AdminDeletedCourseListContext } from '@/components/providers/deleted-course-management.provider';
import { useContext } from 'react';

export const useAdminCourseList = () => {
    const context = useContext(AdminListCourseContext);
    if (!context) {
        throw new Error(
            'useAdminCourseList must be used within CourseManagementProvider'
        );
    }
    return context;
};

export const useAdminDeletedCourseList = () => {
    const context = useContext(AdminDeletedCourseListContext);
    if (!context) {
        throw new Error(
            'useAdminDeletedCourseList must be used within DeletedCourseManagementProvider'
        );
    }
    return context;
};
