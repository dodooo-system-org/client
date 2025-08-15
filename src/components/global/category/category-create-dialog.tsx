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
import Error from 'next/error';
import { memo, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import z from 'zod';
import { CategoryEditForm } from './category-edit-form';

type CategoryCreateDialogProps = Pick<
    CustomizedDialogProps,
    'isOpen' | 'onOpenChange' | 'triggerNode'
>;

export const CategoryCreateDialog = memo(
    ({ isOpen, onOpenChange, triggerNode }: CategoryCreateDialogProps) => {
        const { onCreate } = useContext(AdminCategoryListContext);

        const formRef = useRef<FormAction>(null);

        const onSubmit = (data: z.infer<typeof createCategorySchema>) => {
            const toastId = toast.loading('Creating category...') as string;
            onCreate?.(data)
                .then(() => {
                    onOpenChange?.(false);
                    formRef.current?.reset();
                    toast.dismiss(toastId);
                    toast.success('Category created successfully!');
                })
                .catch((error: Error) => {
                    handleErrorToast(error, toastId);
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
