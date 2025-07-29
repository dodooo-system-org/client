'use client';

import { CategoryAPI } from '@/apis/category';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { CustomizedDialogProps } from '@/types/common';
import { Category } from '@/types/objects';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useCallback, useState } from 'react';
import { CategoryEditForm } from './category-edit-form';

type CategoryCreateDialogProps = Pick<
    CustomizedDialogProps,
    'isOpen' | 'onOpenChange' | 'triggerNode'
>;

export const CategoryCreateDialog = ({
    isOpen,
    onOpenChange,
    triggerNode,
}: CategoryCreateDialogProps) => {
    const [category, setCategory] = useState<
        Pick<
            Category,
            'categoryName' | 'categoryDescription' | 'categoryImageUrl'
        >
    >({
        categoryName: '',
        categoryDescription: '',
        categoryImageUrl: '',
    });

    const handleSubmit = useCallback(
        (
            newCategory: Pick<
                Category,
                'categoryName' | 'categoryDescription' | 'categoryImageUrl'
            >
        ) => {
            CategoryAPI.createCategory(newCategory);
            onOpenChange?.(false);
        },
        [onOpenChange]
    );
    const handleReset = useCallback(() => {
        setCategory({
            categoryName: '',
            categoryDescription: '',
            categoryImageUrl: '',
        });
        onOpenChange?.(false);
    }, [onOpenChange]);
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
                <div>
                    <CategoryEditForm
                        onSubmit={handleSubmit}
                        onValueChange={setCategory}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="reset"
                            variant="secondary"
                            onClick={handleReset}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            onClick={() => handleSubmit(category)}
                        >
                            Submit
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
