'use client';

import { AdminDeletedCourseList } from '@/components/local/admin/admin-deleted-course-list';
import { DeletedCourseManagementProvider } from '@/components/providers/deleted-course-management.provider';

export default function AdminDeletedCoursesPage() {
    return (
        <DeletedCourseManagementProvider>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Deleted Courses</h1>
                        <p>Manage your deleted courses here.</p>
                    </div>
                </div>
                <div>
                    <AdminDeletedCourseList />
                </div>
            </div>
        </DeletedCourseManagementProvider>
    );
}
