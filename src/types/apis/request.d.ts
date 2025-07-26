declare module '@/types/apis/request' {
    interface Pagination {
        page: number;
        size: number;
        query?: string;
        orderBy?: string;
    }
}
