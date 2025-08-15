import { CoursePreview } from '@/types/objects';

declare module '@/types/apis/request' {
    interface Pagination {
        page: number;
        size: number;
        query?: string;
        orderBy?: string;
    }

    namespace Request {
        namespace Category {
            interface AdminGetListCategories extends Pagination {
                isActive: boolean | null;
                isDeleted: boolean | null;
            }
            interface UpdateCategory
                extends Pick<
                    Category,
                    | 'categoryId'
                    | 'categoryName'
                    | 'categoryDescription'
                    | 'categoryImageUrl'
                    | 'isActive'
                    | 'isDeleted'
                > {}
        }
        interface AdminGetListCourses extends Pagination {
            categoryId: string | null;
            courseLevel: number | null;
            isActive: boolean | null;
            isDeleted: boolean | null;
        }
        interface AdminCreateCourse
            extends Pick<
                CoursePreview,
                | 'courseName'
                | 'courseDescription'
                | 'courseImageUrl'
                | 'courseLevel'
            > {
            categoryId: string;
        }
    }
}
