import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Package, Presentation } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import { CoursePreview } from 'types/objects';

export const CourseCard = memo(
    ({ coursePreview }: { coursePreview: CoursePreview }) => {
        return (
            <Card className="py-2">
                <CardContent className="rounded-md px-2">
                    <AspectRatio
                        ratio={16 / 8}
                        className="relative overflow-hidden"
                    >
                        <Image
                            src={
                                coursePreview.courseImageUrl ||
                                'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
                            }
                            alt="Course Image"
                            width={100}
                            height={200}
                            className="h-full w-full rounded-md object-cover object-center"
                        />
                        <div className="absolute top-3 -right-6 rotate-45 bg-red-500 px-6 py-1 text-sm font-semibold text-white shadow drop-shadow-2xl">
                            Inactive
                        </div>
                    </AspectRatio>
                    <div className="text-foreground/75 space-y-2">
                        <h2 className="text-foreground mt-2 text-lg font-bold">
                            {coursePreview.courseName}
                        </h2>
                        <p className="text-sm">
                            Course Duration about:&nbsp;
                            {coursePreview.courseDuration} minutes
                        </p>
                        <div className="flex h-5 items-center gap-x-4 text-sm">
                            <span>
                                {coursePreview.courseLevel === 0
                                    ? 'Beginner'
                                    : coursePreview.courseLevel === 1
                                      ? 'Intermediate'
                                      : 'Advanced'}
                            </span>
                            <Separator orientation="vertical" />
                            <span>{coursePreview.category.categoryName}</span>
                        </div>
                        <div className="flex h-5 items-center gap-x-4 text-sm">
                            <p className="flex items-center gap-1">
                                <Package className="h-4 w-4" />{' '}
                                {coursePreview.moduleCount} Modules
                            </p>
                            <Separator orientation="vertical" />
                            <p className="flex items-center gap-1">
                                <Presentation className="h-4 w-4" />{' '}
                                {coursePreview.lessonCount} lessons
                            </p>
                        </div>
                        <p className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4" />
                            Created on&nbsp;
                            {Intl.DateTimeFormat('en-US', {
                                dateStyle: 'long',
                            }).format(coursePreview.createdAt)}
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="px-2">
                    <Button className="w-full rounded-md" variant="outline">
                        View More
                    </Button>
                </CardFooter>
            </Card>
        );
    }
);

CourseCard.displayName = 'CourseCard';
