import { CourseCard } from '@/components/global/course-card';

export default function AdminCoursesPage() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold">Courses</h1>
                <p>Manage your courses here.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 8 }, (_, index) => (
                    <CourseCard
                        key={index}
                        coursePreview={{
                            courseId: `course-${index}`,
                            courseName: `Course ${index + 1}`,
                            courseDescription: `Description for Course ${index + 1}`,
                            courseImageUrl:
                                'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80',
                            courseLevel: 0,
                            courseDuration: 120,
                            category: {
                                categoryId: `category-${index % 3}`,
                                categoryName: `Category ${(index % 3) + 1}`,
                                categoryDescription: `Description for Category ${(index % 3) + 1}`,
                                categoryImageUrl:
                                    'https://via.placeholder.com/150',
                                status: 1,
                                createdAt: new Date(),
                                updatedAt: null,
                                deletedAt: null,
                            },
                            moduleCount: 10,
                            lessonCount: 200,
                            status: 1,
                            createdAt: new Date(),
                            updatedAt: null,
                            deletedAt: null,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
