'use client';

import { CategoryAPI } from '@/apis/category';
import { PrimaryPagination } from '@/components/global/paginations/primary-pagination';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCaption,
    TableCellException,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { DEFAULT_FUNCTION, REACT_QUERY_KEYS } from '@/constants';
import { cn, formatDate, handleErrorToast } from '@/lib/utils';
import { Pagination, Request } from '@/types/apis/request';
import { StatusType } from '@/types/common';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useQuery } from '@tanstack/react-query';
import { EllipsisVertical } from 'lucide-react';
import Error from 'next/error';
import Image from 'next/image';
import { createContext, useState } from 'react';
import { AdminCategoryListFilter } from './admin-category-list-filter';

type FilterState = Pagination & {
    query?: string;
    status?: StatusType;
    sortBy?: string;
};

export const AdminCategoryListContext = createContext<{
    filter: FilterState;
    setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
}>({
    filter: {
        page: 1,
        size: 10,
    },
    setFilter: DEFAULT_FUNCTION,
});

export const CategoryList = () => {
    const [showFullDescription, setShowFullDescription] = useState<
        Record<string, boolean>
    >({});

    const [filter, setFilter] = useState<FilterState>({
        page: 1,
        size: 10,
    });

    const { data } = useQuery({
        queryKey: [REACT_QUERY_KEYS.ADMIN.ALL_CATEGORIES, filter],
        queryFn: ({ queryKey }) => {
            try {
                const filterState = queryKey[1] as FilterState;
                const payload: Request.AdminGetListCategories = {
                    query: filterState.query?.trim(),
                    isActive:
                        filterState.status === 'active'
                            ? true
                            : filterState.status === 'inactive'
                              ? false
                              : null,
                    isDeleted: filterState.status === 'deleted' ? true : null,
                    page: filterState.page,
                    size: filterState.size,
                };
                return CategoryAPI.getListCategories(payload);
            } catch (error: unknown) {
                handleErrorToast(error as Error);
            }
        },
    });

    const handleToggleDescription = (categoryId: string) => {
        setShowFullDescription(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };
    return (
        <AdminCategoryListContext.Provider value={{ filter, setFilter }}>
            <div className="flex flex-col gap-4">
                <div>
                    <AdminCategoryListFilter />
                </div>
                <PrimaryPagination
                    meta={{
                        page: filter.page,
                        totalPages: data?.meta.totalPages,
                        hasNext: data?.meta.hasNext,
                        hasPrevious: data?.meta.hasPrevious,
                        totalCount: data?.meta.totalCount,
                    }}
                    onPageChange={page => {
                        setFilter(prev => ({ ...prev, page }));
                    }}
                />
                <Table>
                    <TableCaption>A list of your categories.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No.</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Applied</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((category, index) => (
                            <TableRow key={category.categoryId}>
                                <TableCellException
                                    className="font-medium"
                                    value={index + 1}
                                >
                                    {index + 1}
                                </TableCellException>
                                <TableCellException
                                    value={category.categoryImageUrl}
                                >
                                    <AspectRatio ratio={16 / 8}>
                                        <Image
                                            width={40}
                                            height={40}
                                            src={category.categoryImageUrl}
                                            alt={category.categoryName}
                                            className="h-full w-full rounded object-cover object-center"
                                        />
                                    </AspectRatio>
                                </TableCellException>
                                <TableCellException
                                    value={category.categoryName}
                                >
                                    {category.categoryName}
                                </TableCellException>
                                <TableCellException
                                    value={category.categoryDescription}
                                    className="flex items-center justify-between"
                                >
                                    <p
                                        className={cn(
                                            'text-wrap break-words',
                                            showFullDescription[
                                                category.categoryId
                                            ]
                                                ? ''
                                                : 'line-clamp-1'
                                        )}
                                    >
                                        {category.categoryDescription}
                                    </p>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        onClick={() =>
                                            handleToggleDescription(
                                                category.categoryId
                                            )
                                        }
                                        className="float-right"
                                    >
                                        {showFullDescription[
                                            category.categoryId
                                        ]
                                            ? 'Hide'
                                            : 'Show'}
                                    </Button>
                                </TableCellException>
                                <TableCellException
                                    className="text-center"
                                    value={category.appliedInCoursesCount}
                                >
                                    {category.appliedInCoursesCount}
                                </TableCellException>
                                <TableCellException value={category.isActive}>
                                    {category.isActive ? (
                                        <span className="rounded-full bg-green-100 px-2 py-1 text-green-500">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="bg-destructive/10 text-destructive rounded-full px-2 py-1">
                                            Inactive
                                        </span>
                                    )}
                                </TableCellException>
                                <TableCellException value={category.updatedAt}>
                                    {category.updatedAt
                                        ? formatDate(
                                              category.updatedAt,
                                              'medium'
                                          )
                                        : '--'}
                                </TableCellException>
                                <TableCellException
                                    className="text-right"
                                    value={true}
                                >
                                    <DropdownActions />
                                </TableCellException>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AdminCategoryListContext.Provider>
    );
};

const DropdownActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-20">
                <DropdownMenuGroup>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
