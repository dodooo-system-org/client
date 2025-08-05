'use client';

import { CategoryAPI } from '@/apis/category';
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
import { useMutation } from '@tanstack/react-query';
import Error from 'next/error';
import { memo, useRef } from 'react';
import { toast } from 'react-toastify';
import z from 'zod';
import { CategoryEditForm } from './category-edit-form';

type CategoryCreateDialogProps = Pick<
    CustomizedDialogProps,
    'isOpen' | 'onOpenChange' | 'triggerNode'
>;

export const CategoryCreateDialog = memo(
    ({ isOpen, onOpenChange, triggerNode }: CategoryCreateDialogProps) => {
        const formRef = useRef<FormAction>(null);
        const toastRef = useRef<ReturnType<typeof toast.loading>>(null);

        const createCategoryMutation = useMutation({
            mutationFn: async (
                data: Pick<
                    Category,
                    'categoryName' | 'categoryDescription' | 'categoryImageUrl'
                >
            ) => {
                toastRef.current = toast.loading('Creating category...');

                return await CategoryAPI.createCategory({
                    categoryName: data.categoryName,
                    categoryDescription: data.categoryDescription,
                    categoryImageUrl: data.categoryImageUrl,
                });
            },
            onSuccess: () => {
                onOpenChange?.(false);
                toast.dismiss(toastRef.current?.toString());
                toast.success('Category created successfully!');
            },
            onError: (error: Error) => {
                toast.dismiss(toastRef.current?.toString());
                handleErrorToast(error);
            },
            onSettled: () => {
                formRef.current?.reset();
            },
        });

        const onSubmit = (data: z.infer<typeof createCategorySchema>) => {
            createCategoryMutation.mutate({
                categoryName: data.categoryName,
                categoryDescription: data.categoryDescription,
                categoryImageUrl: data.categoryImageUrl,
            });
        };

        return (
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                {triggerNode && (
                    <DialogTrigger asChild>{triggerNode}</DialogTrigger>
                )}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new category</DialogTitle>
                        <DialogDescription>
                            Use this dialog to create a new category for your
                            courses. Fill in the necessary details and click
                            &apos;Create&apos; to save.
                        </DialogDescription>
                    </DialogHeader>
                    <CategoryEditForm onSubmit={onSubmit} ref={formRef} />
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

CategoryCreateDialog.displayName = 'CategoryCreateDialog';
