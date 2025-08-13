'use client';

import { courseAPI } from '@/apis/course';
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
import { createCormSchema } from '@/lib/validation-schemas';
import { CustomizedDialogProps, FormAction } from '@/types/common';
import { Category, CoursePreview } from '@/types/objects';
import { useMutation } from '@tanstack/react-query';
import Error from 'next/error';
import { useRouter } from 'next/navigation';
import { memo, useRef } from 'react';
import { toast } from 'react-toastify';
import z from 'zod';
import { CourseEditForm } from './course-edit-form';

type CourseCreateDialogProps = Pick<
    CustomizedDialogProps,
    'isOpen' | 'onOpenChange' | 'triggerNode'
>;

export const CourseCreateDialog = memo(
    ({ isOpen, onOpenChange, triggerNode }: CourseCreateDialogProps) => {
        const formRef = useRef<FormAction>(null);
        const toastRef = useRef<ReturnType<typeof toast.loading>>(null);
        const router = useRouter();

        const createCourseMutation = useMutation({
            mutationFn: async (
                data: Pick<
                    CoursePreview,
                    | 'courseName'
                    | 'courseLevel'
                    | 'courseDescription'
                    | 'courseImageUrl'
                    | 'category'
                >
            ) => {
                toastRef.current = toast.loading('Creating course...');

                return await courseAPI.createCourse({
                    categoryId: data.category.categoryId,
                    courseDescription: data.courseDescription,
                    courseImageUrl: data.courseImageUrl,
                    courseLevel: data.courseLevel,
                    courseName: data.courseName,
                });
            },
            onSuccess: data => {
                onOpenChange?.(false);
                toast.dismiss(toastRef.current?.toString());
                toast.success('Course created successfully!');

                // navigate to course detail page
                router.push(`courses/${data.courseId}`);
            },
            onError: (error: Error) => {
                toast.dismiss(toastRef.current?.toString());
                handleErrorToast(error);
            },
            onSettled: () => {
                formRef.current?.reset();
            },
        });

        const onSubmit = (data: z.infer<typeof createCormSchema>) => {
            createCourseMutation.mutate({
                category: data.category as Category,
                courseDescription: data.courseDescription,
                courseName: data.courseName,
                courseImageUrl: data.courseImageUrl,
                courseLevel: data.courseLevel as Pick<
                    CoursePreview,
                    'courseLevel'
                >['courseLevel'],
            });
        };

        return (
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                {triggerNode && (
                    <DialogTrigger asChild>{triggerNode}</DialogTrigger>
                )}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new course</DialogTitle>
                        <DialogDescription>
                            Use this dialog to create a new course. Fill in the
                            necessary details and click &apos;Create&apos; to
                            save.
                        </DialogDescription>
                    </DialogHeader>
                    <CourseEditForm onSubmit={onSubmit} ref={formRef} />
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
CourseCreateDialog.displayName = 'CourseCreateDialog';
