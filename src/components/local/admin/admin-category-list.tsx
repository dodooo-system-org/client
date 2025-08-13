'use client';

import { PrimaryPagination } from '@/components/global/paginations/primary-pagination';
import { AdminCategoryListContext } from '@/components/providers/category-management.provider';
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
    TableCellException,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn, formatDate } from '@/lib/utils';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { AdminCategoryListFilter } from './admin-category-list-filter';

export const CategoryList = () => {
    const { filter, items, meta, setFilter } = useContext(
        AdminCategoryListContext
    );

    const [showFullDescription, setShowFullDescription] = useState<
        Record<string, boolean>
    >({});

    const handleToggleDescription = (categoryId: string) => {
        setShowFullDescription(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };
    return (
        <div className="flex flex-col gap-4">
            <div>
                <AdminCategoryListFilter />
            </div>
            <PrimaryPagination
                meta={{
                    page: filter.page,
                    totalPages: meta?.totalPages,
                    hasNext: meta?.hasNext,
                    hasPrevious: meta?.hasPrevious,
                    totalCount: meta?.totalCount,
                }}
                onPageChange={page => {
                    setFilter(prev => ({ ...prev, page }));
                }}
            />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items?.map((category, index) => (
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
                                        width={200}
                                        height={100}
                                        src={category.categoryImageUrl}
                                        alt={category.categoryName}
                                        className="h-full w-full rounded object-cover object-center"
                                    />
                                </AspectRatio>
                            </TableCellException>
                            <TableCellException value={category.categoryName}>
                                {category.categoryName}
                            </TableCellException>
                            <TableCellException
                                value={category.categoryDescription}
                                className="flex items-center justify-between"
                            >
                                <p
                                    className={cn(
                                        'text-wrap break-words',
                                        showFullDescription[category.categoryId]
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
                                    {showFullDescription[category.categoryId]
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
                                    ? formatDate(category.updatedAt, 'medium')
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
            <PrimaryPagination
                meta={{
                    page: filter.page,
                    totalPages: meta?.totalPages,
                    hasNext: meta?.hasNext,
                    hasPrevious: meta?.hasPrevious,
                    totalCount: meta?.totalCount,
                }}
                onPageChange={page => {
                    setFilter(prev => ({ ...prev, page }));
                }}
            />
        </div>
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
