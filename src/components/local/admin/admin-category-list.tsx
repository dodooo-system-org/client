'use client';

import { CategoryEditDialog } from '@/components/global/category/category-edit-dialog';
import { ImageWithPlaceholder } from '@/components/global/ImageWithPlaceholder';
import { PrimaryPagination } from '@/components/global/pagination/primary-pagination';
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
import { useAdminCategoryList } from '@/hooks/use-category-context';
import { cn, formatDate, handleErrorToast } from '@/lib/utils';
import { CategoryWithAppliedCount } from '@/types/objects';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { EllipsisVertical } from 'lucide-react';
import Error from 'next/error';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AdminCategoryListFilter } from './admin-category-list-filter';

export const CategoryList = () => {
    const { filter, items, meta, setFilter } = useAdminCategoryList();

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
                                    <ImageWithPlaceholder
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
                                {category.isDeleted ? (
                                    <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-500">
                                        Deleted
                                    </span>
                                ) : category.isActive ? (
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-green-500 dark:bg-green-900">
                                        Active
                                    </span>
                                ) : (
                                    <span className="bg-destructive/10 text-destructive dark:bg-destructive/40 rounded-full px-2 py-1">
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
                                <DropdownActions category={category} />
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

const DropdownActions = ({
    category,
}: {
    category: CategoryWithAppliedCount;
}) => {
    const [showForm, setShowForm] = useState(false);
    const { onActivate, onDeactivate, onDelete } = useAdminCategoryList();

    const handleActivate = async () => {
        const toastId = toast.loading(
            `${category.isActive ? 'Deactivating' : 'Activating'} category...`
        );
        try {
            if (category.isActive) {
                await onDeactivate?.(category.categoryId, category);
                toast.dismiss(toastId);
                toast.success('Category deactivated successfully!');
            } else {
                await onActivate?.(category.categoryId, category);
                toast.dismiss(toastId);
                toast.success('Category activated successfully!');
            }
        } catch (error: unknown) {
            handleErrorToast(error as Error, toastId as string);
        }
    };

    const handleDelete = async () => {
        const confirmMessage = `Are you sure you want to delete the category "${category.categoryName}"?\n\nThis category is currently applied to ${category.appliedInCoursesCount} course${category.appliedInCoursesCount === 1 ? '' : 's'}. This action can be undone later.`;

        if (window.confirm(confirmMessage)) {
            const toastId = toast.loading('Deleting category...');
            try {
                await onDelete?.(category.categoryId, category);
                toast.dismiss(toastId);
                toast.success('Category deleted successfully!');
            } catch (error) {
                handleErrorToast(error as Error, toastId as string);
            }
        }
    };

    return (
        <>
            <CategoryEditDialog
                currentCategory={category}
                isOpen={showForm}
                onOpenChange={setShowForm}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <EllipsisVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-20">
                    <DropdownMenuGroup>
                        {!category.isDeleted && (
                            <DropdownMenuItem onClick={handleActivate}>
                                {category.isActive ? 'Deactivate' : 'Activate'}
                            </DropdownMenuItem>
                        )}
                        {!category.isDeleted && (
                            <DropdownMenuItem onClick={() => setShowForm(true)}>
                                Edit
                            </DropdownMenuItem>
                        )}
                        {!category.isDeleted && <DropdownMenuSeparator />}
                        <DropdownMenuItem
                            onClick={handleDelete}
                            className="text-destructive focus:text-destructive"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
