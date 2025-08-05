'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_FUNCTION } from '@/constants';
import { createCategorySchema } from '@/lib/validation-schemas';
import { FormAction } from '@/types/common';
import { Category } from '@/types/objects';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormField } from '../form';
import { ImageDropZone } from '../image-drop-zone';

type CategoryFormData = Pick<
    Category,
    'categoryName' | 'categoryDescription' | 'categoryImageUrl'
>;

type CategoryEditFormProps = {
    initialCategory?: CategoryFormData;
    onValueChange?: (category: Partial<CategoryFormData>) => void;
    onSubmit?: (values: z.infer<typeof createCategorySchema>) => void;
};

const defaultValues = {
    categoryName: '',
    categoryDescription: '',
    categoryImageUrl: '',
} as CategoryFormData;

export const CategoryEditForm = memo(
    forwardRef<FormAction, CategoryEditFormProps>(
        (
            { initialCategory = defaultValues, onSubmit = DEFAULT_FUNCTION },
            ref
        ) => {
            const {
                control,
                register,
                handleSubmit,
                reset,
                formState: { errors },
            } = useForm({
                resolver: zodResolver(createCategorySchema),
                defaultValues: initialCategory,
            });

            useImperativeHandle(
                ref,
                (): FormAction => ({
                    submit: handleSubmit(onSubmit),
                    reset: () => reset(initialCategory),
                })
            );

            return (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        label="Category Image"
                        error={errors.categoryImageUrl}
                    >
                        <Controller
                            name="categoryImageUrl"
                            control={control}
                            render={({ field }) => (
                                <ImageDropZone
                                    ratio={16 / 8}
                                    initialImageSrc={field.value}
                                    onImageDrop={field.onChange}
                                    isErrored={!!errors?.categoryImageUrl}
                                />
                            )}
                        />
                    </FormField>

                    <FormField
                        label="Category Name"
                        error={errors.categoryName}
                    >
                        <Input
                            type="text"
                            {...register('categoryName')}
                            placeholder="Enter category name"
                        />
                    </FormField>

                    <FormField
                        label="Category Description"
                        error={errors.categoryDescription}
                    >
                        <Textarea
                            placeholder="Enter category description"
                            {...register('categoryDescription')}
                            className="h-40"
                        />
                    </FormField>
                </form>
            );
        }
    )
);

CategoryEditForm.displayName = 'CategoryEditForm';
