'use client';

import { CourseAPI } from '@/apis/course';
import { AdminListCourseContext } from '@/components/local/admin/admin-course-list';
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
import { memo, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import z from 'zod';
import { CourseEditForm } from './course-edit-form';

type CourseCreateDialogProps = Pick<
    CustomizedDialogProps,
    'isOpen' | 'onOpenChange' | 'triggerNode'
>;

export const CourseCreateDialog = memo((props: CourseCreateDialogProps) => {
    const { isOpen, onOpenChange, triggerNode } = props;
    const { refreshListCourse } = useContext(AdminListCourseContext);
    const formRef = useRef<FormAction>(null);

    const createCourseMutation = useMutation({
        mutationFn: (
            data: Pick<
                CoursePreview,
                | 'courseName'
                | 'courseLevel'
                | 'courseDescription'
                | 'courseImageUrl'
                | 'category'
            >
        ) => {
            toast.loading('Creating course...');

            return CourseAPI.createCourse({
                categoryId: data.category.categoryId,
                courseDescription: data.courseDescription,
                courseImageUrl: data.courseImageUrl,
                courseLevel: data.courseLevel,
                courseName: data.courseName,
            });
        },
        onSuccess: () => {
            refreshListCourse();
            toast.dismiss();
            onOpenChange?.(false);
            toast.success('Course created successfully!');
        },
        onError: (error: Error) => {
            toast.dismiss();
            handleErrorToast(error);
        },
    });

    const handleCreateCourse = (values: z.infer<typeof createCormSchema>) => {
        createCourseMutation.mutate({
            category: values.category as Category,
            courseDescription: values.courseDescription,
            courseName: values.courseName,
            courseImageUrl: values.courseImageUrl,
            courseLevel: values.courseLevel as Pick<
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
                    <DialogTitle>Create new category</DialogTitle>
                    <DialogDescription>
                        Use this dialog to create a new course. Fill in the
                        necessary details and click &apos;Create&apos; to save.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <CourseEditForm
                        ref={formRef}
                        onSubmit={handleCreateCourse}
                    />
                </div>
                <DialogFooter>
                    <Button
                        type="reset"
                        variant="secondary"
                        onClick={() => {
                            formRef.current?.reset();
                        }}
                    >
                        Cancel
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
});

CourseCreateDialog.displayName = 'CourseCreateDialog';
