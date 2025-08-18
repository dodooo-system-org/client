'use client';

import { ImageWithPlaceholder } from '@/components/global/ImageWithPlaceholder';
import { PrimaryPagination } from '@/components/global/pagination/primary-pagination';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCellException,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAdminDeletedCategoryList } from '@/hooks/use-category-context';
import { cn, formatDate, handleErrorToast } from '@/lib/utils';
import { CategoryWithAppliedCount } from '@/types/objects';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { RotateCcw } from 'lucide-react';
import Error from 'next/error';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AdminDeletedCategoryListFilter } from './admin-deleted-category-list-filter';

export const AdminDeletedCategoryList = () => {
    const { filter, items, meta, setFilter } = useAdminDeletedCategoryList();

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
                <AdminDeletedCategoryListFilter />
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
                        <TableHead>Deleted At</TableHead>
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
                                    <ImageWithPlaceholder
                                        width={200}
                                        height={100}
                                        src={category.categoryImageUrl}
                                        alt={category.categoryName}
                                        className="h-full w-full rounded object-cover object-center opacity-60"
                                    />
                                </AspectRatio>
                            </TableCellException>
                            <TableCellException value={category.categoryName}>
                                <span className="text-gray-500">
                                    {category.categoryName}
                                </span>
                            </TableCellException>
                            <TableCellException
                                value={category.categoryDescription}
                                className="flex items-center justify-between"
                            >
                                <p
                                    className={cn(
                                        'text-wrap break-words text-gray-500',
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
                                    className="float-right text-gray-400"
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
                                <span className="text-gray-500">
                                    {category.appliedInCoursesCount}
                                </span>
                            </TableCellException>
                            <TableCellException value={category.updatedAt}>
                                <span className="text-gray-500">
                                    {category.updatedAt
                                        ? formatDate(
                                              category.updatedAt,
                                              'medium'
                                          )
                                        : '--'}
                                </span>
                            </TableCellException>
                            <TableCellException
                                className="text-right"
                                value={true}
                            >
                                <RestoreAction category={category} />
                            </TableCellException>
                        </TableRow>
                    ))}
                    {(!items || items.length === 0) && (
                        <TableRow>
                            <TableCellException
                                className="h-24 text-center text-gray-500"
                                colSpan={7}
                                value="No deleted categories found"
                            >
                                No deleted categories found
                            </TableCellException>
                        </TableRow>
                    )}
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

const RestoreAction = ({
    category,
}: {
    category: CategoryWithAppliedCount;
}) => {
    const { onRestore } = useAdminDeletedCategoryList();

    const handleRestore = async () => {
        const confirmMessage = `Are you sure you want to restore the category "${category.categoryName}"?`;

        if (window.confirm(confirmMessage)) {
            const toastId = toast.loading('Restoring category...');
            try {
                await onRestore?.(category.categoryId, category);
                toast.dismiss(toastId);
                toast.success('Category restored successfully!');
            } catch (error) {
                handleErrorToast(error as Error, toastId as string);
            }
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRestore}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:text-blue-700"
                >
                    <RotateCcw className="mr-1 h-4 w-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
                <p>Restore this category</p>
            </TooltipContent>
        </Tooltip>
    );
};
