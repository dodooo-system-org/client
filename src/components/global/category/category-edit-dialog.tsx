'use client';

import { AdminCategoryListContext } from '@/components/providers/category-management.provider';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { handleErrorToast } from '@/lib/utils';
import { createCategorySchema } from '@/lib/validation-schemas';
import { CustomizedDialogProps, FormAction } from '@/types/common';
import { Category } from '@/types/objects';
import Error from 'next/error';
import { memo, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { CategoryEditForm } from './category-edit-form';

type CategoryEditDialogProps = Pick<
    CustomizedDialogProps,
    'isOpen' | 'onOpenChange' | 'triggerNode'
> & {
    currentCategory: Category;
};

export const CategoryEditDialog = memo(
    ({
        isOpen,
        onOpenChange,
        triggerNode,
        currentCategory,
    }: CategoryEditDialogProps) => {
        const { onEdit } = useContext(AdminCategoryListContext);

        const formRef = useRef<FormAction>(null);

        const onSubmit = async (
            values: z.infer<typeof createCategorySchema>
        ) => {
            const toastId = toast.loading('Updating category...');
            onEdit?.({
                categoryId: currentCategory.categoryId,
                categoryName: values.categoryName,
                categoryDescription: values.categoryDescription,
                categoryImageUrl: values.categoryImageUrl,
                isActive: currentCategory.isActive,
                isDeleted: currentCategory.isDeleted,
                createdAt: currentCategory.createdAt,
                updatedAt: currentCategory.updatedAt,
                deletedAt: currentCategory.deletedAt,
            })
                .then(() => {
                    toast.dismiss(toastId);
                    toast.success('Category updated successfully!');
                    onOpenChange?.(false);
                })
                .catch((error: unknown) => {
                    handleErrorToast(error as Error, toastId as string);
                });
        };

        return (
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                {triggerNode && (
                    <DialogTrigger asChild>{triggerNode}</DialogTrigger>
                )}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update current category</DialogTitle>
                        <DialogDescription>
                            Use this dialog to update the current category for
                            your courses. Fill in the necessary details and
                            click &apos;Update&apos; to save.
                        </DialogDescription>
                    </DialogHeader>
                    <CategoryEditForm
                        initialCategory={{
                            categoryName: currentCategory.categoryName,
                            categoryDescription:
                                currentCategory.categoryDescription,
                            categoryImageUrl: currentCategory.categoryImageUrl,
                        }}
                        onSubmit={onSubmit}
                        ref={formRef}
                    />
                    <DialogFooter>
                        <Button
                            type="reset"
                            variant="secondary"
                            onClick={() => {
                                formRef.current?.reset();
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            onClick={() => {
                                formRef.current?.submit();
                            }}
                        >
                            Submit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }
);

CategoryEditDialog.displayName = 'CategoryEditDialog';
