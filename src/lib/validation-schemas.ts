import z from 'zod';

export const createCategorySchema = z.object({
    categoryName: z
        .string()
        .min(1, 'Please enter a category name')
        .max(100, 'Category name must be less than 100 characters'),
    categoryDescription: z
        .string('Please enter a category description')
        .min(10, 'Category description must be at least 10 characters')
        .max(1000, 'Category description must be less than 1000 characters'),
    categoryImageUrl: z
        .string('Please upload a category image')
        .min(1, 'Please upload a category image'),
});

export const createCormSchema = z.object({
    courseName: z
        .string()
        .min(1, 'Please enter a course name')
        .max(100, 'Course name must be less than 100 characters'),
    courseDescription: z
        .string('Please enter a course description')
        .min(10, 'Course description must be at least 10 characters')
        .max(1000, 'Course description must be less than 1000 characters'),
    courseImageUrl: z
        .string('Please upload a profile image')
        .min(1, 'Profile image is required'),
    category: z
        .transform(value => {
            if (value === null || value === undefined) {
                return null;
            }
            if (
                typeof value === 'object' &&
                'categoryId' in value &&
                'categoryName' in value
            ) {
                return value;
            }
            return null;
        })
        .refine(value => value !== null, {
            message: 'Please select a category',
        }),
    courseLevel: z
        .number()
        .int()
        .min(0, 'Course level must be a positive integer')
        .max(3, 'Course level must be less than or equal to 3')
        .nonoptional('Please select a course level'),
});
