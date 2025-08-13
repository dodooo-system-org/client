'use client';

import { courseAPI } from '@/apis/course';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_FUNCTION } from '@/constants';
import { createCormSchema } from '@/lib/validation-schemas';
import { FormAction } from '@/types/common';
import { Category, CoursePreview } from '@/types/objects';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { AvailableCategorySelect } from '../available-category-select';
import { CourseLevelSelect } from '../course-level-select';
import { FormField } from '../form';
import { ImageDropZone } from '../image-drop-zone';

type CourseFormData = Pick<
    CoursePreview,
    'courseName' | 'courseDescription' | 'courseImageUrl' | 'courseLevel'
> & {
    category: Category | undefined;
};

type CourseEditFormProps = {
    initialCourse?: CourseFormData;
    onValueChange?: (course: Partial<CourseFormData>) => void;
    onSubmit?: (values: z.infer<typeof createCormSchema>) => void;
};
const defaultValues = {
    courseName: '',
    courseDescription: '',
    courseImageUrl: '',
    category: undefined,
    courseLevel: 0,
} as CourseFormData;
export const CourseEditForm = memo(
    forwardRef<FormAction, CourseEditFormProps>(
        (
            { initialCourse = defaultValues, onSubmit = DEFAULT_FUNCTION },
            ref
        ) => {
            const {
                control,
                register,
                handleSubmit,
                reset,
                formState: { errors },
            } = useForm({
                resolver: zodResolver(createCormSchema),
                defaultValues: initialCourse,
            });

            useImperativeHandle(
                ref,
                (): FormAction => ({
                    submit: handleSubmit(onSubmit),
                    reset: () => reset(initialCourse),
                })
            );

            return (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        label="Course Image"
                        error={errors.courseImageUrl}
                    >
                        <Controller
                            name="courseImageUrl"
                            control={control}
                            render={({ field }) => (
                                <ImageDropZone
                                    ratio={16 / 8}
                                    initialImageSrc={field.value}
                                    onImageDrop={field.onChange}
                                    onUploadUrl={courseAPI.uploadImage}
                                    isErrored={!!errors?.courseImageUrl}
                                />
                            )}
                        />
                    </FormField>

                    <FormField label="Course Name" error={errors.courseName}>
                        <Input
                            type="text"
                            {...register('courseName')}
                            placeholder="Enter course name"
                        />
                    </FormField>

                    <FormField
                        label="Course Description"
                        error={errors.courseDescription}
                    >
                        <Textarea
                            placeholder="Enter course description"
                            {...register('courseDescription')}
                            className="h-40"
                        />
                    </FormField>

                    <FormField label="Course Level" error={errors.courseLevel}>
                        <Controller
                            name="courseLevel"
                            control={control}
                            render={({ field }) => (
                                <CourseLevelSelect
                                    value={
                                        field.value as Pick<
                                            CoursePreview,
                                            'courseLevel'
                                        >['courseLevel']
                                    }
                                    onValueChange={field.onChange}
                                />
                            )}
                        />
                    </FormField>

                    <FormField label="Category" error={errors?.category}>
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <AvailableCategorySelect
                                    initValue={field.value as Category}
                                    onSelectedCategory={field.onChange}
                                    isError={!!errors?.category}
                                />
                            )}
                        />
                    </FormField>
                </form>
            );
        }
    )
);

CourseEditForm.displayName = 'CourseEditForm';
