import { CourseList } from '@/components/local/admin/admin-course-list';

export default function AdminCoursesPage() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold">Courses</h1>
                <p>Manage your courses here.</p>
            </div>
            <div>
                <CourseList />
            </div>
        </div>
    );
}
