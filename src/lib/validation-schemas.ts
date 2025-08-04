import z from 'zod';

export const createCormSchema = z.object({
    courseName: z
        .string()
        .min(1, 'Course name is required')
        .max(100, 'Course name must be less than 100 characters'),
    courseDescription: z
        .string()
        .min(10, 'Course description must be at least 10 characters')
        .max(1000, 'Course description must be less than 1000 characters'),
    courseImageUrl: z.url('Invalid URL format'),
    category: z
        .object({
            categoryId: z.string().min(1, 'Category is required'),
            categoryName: z.string().min(1, 'Category name is required'),
        })
        .nonoptional('Category is required'),
    courseLevel: z
        .number()
        .int()
        .min(0, 'Course level must be a positive integer')
        .max(3, 'Course level must be less than or equal to 3'),
});
