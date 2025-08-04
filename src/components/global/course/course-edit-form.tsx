'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_FUNCTION } from '@/constants';
import { cn } from '@/lib/utils';
import { createCormSchema } from '@/lib/validation-schemas';
import { FormAction } from '@/types/common';
import { Category, CoursePreview } from '@/types/objects';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, memo, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AvailableCategorySelect } from '../available-category-select';
import { CourseLevelSelect } from '../course-level-select';
import { FormField } from '../form';
import { ImageDropZone } from '../image-drop-zone';

type CourseFormData = Pick<
    CoursePreview,
    | 'courseName'
    | 'courseDescription'
    | 'courseImageUrl'
    | 'category'
    | 'courseLevel'
>;

type CourseEditFormProps = {
    initialCourse?: Partial<CourseFormData>;
    onValueChange?: (course: Partial<CourseFormData>) => void;
    onSubmit?: (values: z.infer<typeof createCormSchema>) => void;
};

const defaultValues = {
    courseName: '',
    courseDescription: '',
    courseImageUrl: '',
    category: {
        categoryId: '',
        categoryName: '',
    },
    courseLevel: 0,
} as CourseFormData;

export const CourseEditForm = memo(
    forwardRef<FormAction, CourseEditFormProps>(
        (
            { initialCourse = defaultValues, onSubmit = DEFAULT_FUNCTION },
            ref
        ) => {
            const {
                register,
                handleSubmit,
                reset,
                setValue,
                formState: { errors },
                watch,
            } = useForm<z.infer<typeof createCormSchema>>({
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

            const watchedValues = {
                courseImageUrl: watch('courseImageUrl'),
                courseLevel: watch('courseLevel') as Pick<
                    CoursePreview,
                    'courseLevel'
                >['courseLevel'],
                category: watch('category') as Category,
            };

            return (
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormField
                        label="Course Image Url"
                        error={errors.courseImageUrl}
                    >
                        <ImageDropZone
                            ratio={16 / 8}
                            initialImageSrc={watchedValues.courseImageUrl}
                            onImageDrop={(imageUrl: string) =>
                                setValue('courseImageUrl', imageUrl)
                            }
                            isErrored={!!errors.courseImageUrl}
                        />
                    </FormField>

                    <FormField
                        label="Course Name"
                        htmlFor="courseName"
                        error={errors.courseName}
                    >
                        <Input
                            type="text"
                            placeholder="Enter course name"
                            {...register('courseName')}
                            className={cn(
                                errors.courseName && 'border-red-600'
                            )}
                        />
                    </FormField>

                    <FormField
                        label="Course Description"
                        htmlFor="courseDescription"
                        error={errors.courseDescription}
                    >
                        <Textarea
                            placeholder="Enter course description"
                            {...register('courseDescription')}
                            className={cn(
                                'h-32',
                                errors.courseDescription && 'border-red-600'
                            )}
                        />
                    </FormField>

                    <FormField
                        label="Course Level"
                        htmlFor="courseLevel"
                        error={errors.courseLevel}
                    >
                        <CourseLevelSelect
                            value={watchedValues.courseLevel}
                            onValueChange={(value: number) =>
                                setValue('courseLevel', value)
                            }
                        />
                    </FormField>

                    <FormField
                        label="Category"
                        htmlFor="category"
                        error={errors.category?.categoryId}
                    >
                        <AvailableCategorySelect
                            initValue={watchedValues.category as Category}
                            isError={!!errors.category?.categoryId}
                            onSelectedCategory={(
                                category: Category | undefined
                            ) => {
                                if (category) {
                                    setValue('category', {
                                        categoryId: category.categoryId,
                                        categoryName: category.categoryName,
                                    });
                                }
                            }}
                        />
                    </FormField>
                </form>
            );
        }
    )
);

CourseEditForm.displayName = 'CourseEditForm';
