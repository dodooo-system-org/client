import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn, formatDate } from '@/lib/utils';
import { CoursePreview } from '@/types/objects';
import { Calendar, Package, Presentation } from 'lucide-react';
import { memo } from 'react';
import { ImageWithPlaceholder } from './ImageWithPlaceholder';

export const CourseCard = memo(
    ({ coursePreview }: { coursePreview: CoursePreview }) => {
        return (
            <Card className="py-2">
                <CardContent className="rounded-md px-2">
                    <AspectRatio
                        ratio={16 / 8}
                        className="relative overflow-hidden"
                    >
                        <ImageWithPlaceholder
                            src={coursePreview.courseImageUrl || '/800x400.svg'}
                            blurDataURL="/800x400.svg"
                            alt="Course Image"
                            priority={true}
                            width={400}
                            height={200}
                            className="h-full w-full rounded-md object-cover object-center"
                        />
                        {(!coursePreview.isActive ||
                            coursePreview.isDeleted) && (
                            <div
                                className={cn(
                                    'absolute top-3 -right-6 rotate-45 px-6 py-1 text-sm font-semibold text-white shadow drop-shadow-2xl',
                                    coursePreview.isDeleted
                                        ? 'bg-purple-700'
                                        : 'bg-red-700'
                                )}
                            >
                                {coursePreview.isDeleted
                                    ? 'Deleted'
                                    : 'Inactive'}
                            </div>
                        )}
                    </AspectRatio>
                    <div className="text-foreground/75 space-y-2">
                        <h2 className="text-foreground mt-2 text-lg font-bold">
                            {coursePreview.courseName}
                        </h2>
                        <p className="text-sm">
                            Course Duration about:&nbsp;
                            {coursePreview.courseDuration || '--'} minutes
                        </p>
                        <div className="flex h-5 items-center gap-x-4 text-sm">
                            <span>{coursePreview.category.categoryName}</span>
                            <Separator orientation="vertical" />
                            <span>
                                {coursePreview.courseLevel === 0
                                    ? 'Beginner'
                                    : coursePreview.courseLevel === 1
                                      ? 'Intermediate'
                                      : 'Advanced'}
                            </span>
                        </div>
                        <div className="flex h-5 items-center gap-x-4 text-sm">
                            <p className="flex items-center gap-1">
                                <Package className="h-4 w-4" />
                                &nbsp;
                                {coursePreview.moduleCount} Modules
                            </p>
                            <Separator orientation="vertical" />
                            <p className="flex items-center gap-1">
                                <Presentation className="h-4 w-4" />
                                &nbsp;
                                {coursePreview.lessonCount} lessons
                            </p>
                        </div>
                        <p className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4" />
                            Created on&nbsp;
                            {formatDate(coursePreview.createdAt)}
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
