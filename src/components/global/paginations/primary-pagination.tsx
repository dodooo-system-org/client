import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { getPageNumbers } from '@/lib/utils';
import { Meta } from '@/types/apis/response';
import { memo } from 'react';

type PrimaryPaginationProps = {
    meta: Partial<
        Pick<
            Meta,
            'page' | 'totalPages' | 'hasNext' | 'hasPrevious' | 'totalCount'
        >
    >;
    onPageChange: (page: number) => void;
};

export const PrimaryPagination = memo(
    ({ meta, onPageChange }: PrimaryPaginationProps) => {
        return (
            <Pagination>
                <PaginationContent>
                    <PaginationItem className="mr-2">
                        <PaginationPrevious
                            isDisabled={!meta?.hasPrevious}
                            onClick={() => onPageChange(Number(meta?.page) - 1)}
                        />
                    </PaginationItem>
                    {getPageNumbers({
                        ...meta,
                    } as Meta).map((pageNum, index) =>
                        pageNum === 'ellipsis1' ||
                        pageNum === 'ellipsis2' ||
                        pageNum === 'ellipsis' ? (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    role="button"
                                    isActive={meta?.page === pageNum}
                                    onClick={() =>
                                        onPageChange(Number(pageNum))
                                    }
                                >
                                    {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    )}
                    <PaginationItem className="ml-2">
                        <PaginationNext
                            isDisabled={!meta?.hasNext}
                            onClick={() => onPageChange(Number(meta?.page) + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );
    }
);

PrimaryPagination.displayName = 'PrimaryPagination';
