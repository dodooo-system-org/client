import { CategoryCreateDialog } from '@/components/global/category/category-create-dialog';
import { CourseCreateDialog } from '@/components/global/course/course-create-dialog';
import { CourseList } from '@/components/local/admin/admin-course-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function AdminCoursesPage() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Courses</h1>
                    <p>Manage your courses here.</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <CourseCreateDialog
                        triggerNode={
                            <Button>
                                <Plus />
                                <span>New course</span>
                            </Button>
                        }
                    />
                    <CategoryCreateDialog
                        triggerNode={
                            <Button variant="outline" size="sm">
                                New category
                            </Button>
                        }
                    />
                </div>
            </div>
            <div>
                <CourseList />
            </div>
        </div>
    );
}
