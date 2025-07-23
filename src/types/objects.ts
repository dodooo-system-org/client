declare module 'types/objects' {
    interface TimeStampBase {
        createdAt: Date;
        updatedAt?: Date | null;
        deletedAt?: Date | null;
        status: 0 | 1; // 0: Active, 1: Inactive
    }

    interface Category extends TimeStampBase {
        categoryId: string;
        categoryName: string;
        categoryDescription: string;
        categoryImageUrl: string;
    }

    interface CoursePreview extends TimeStampBase {
        courseId: string;
        courseName: string;
        courseDescription: string;
        courseImageUrl: string;
        courseLevel: 0 | 1 | 2; // 0: Beginner, 1: Intermediate, 2: Advanced
        courseDuration: number; // e.g., 120 // in minutes
        category: Category;
        moduleCount: number; // e.g., 10
        lessonCount: number; // e.g., 200
    }
}
