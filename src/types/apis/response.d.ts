import { Pagination } from '@/types/apis/request';

declare module '@/types/apis/response' {
    interface Meta extends Pick<Pagination, 'page' | 'size'> {
        totalCount: number;
        totalPages: number;
        hasPrevious: boolean;
        hasNext: boolean;
    }
    interface MetaPagination<T> {
        data: T[];
        meta: Meta;
    }

    interface IKSignature {
        signature: string;
        expire: number;
        token: string;
    }
}
