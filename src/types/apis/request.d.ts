declare module '@/types/apis/request' {
    interface Pagination {
        page: number;
        size: number;
        query?: string;
        orderBy?: string;
    }

    namespace Request {
        interface AdminGetListCourses extends Pagination {
            categoryId: string | null;
            courseLevel: number | null;
            isActive: boolean | null;
            isDeleted: boolean | null;
        }
    }
}
