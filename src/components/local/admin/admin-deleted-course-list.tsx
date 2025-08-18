'use client';

import { ImageWithPlaceholder } from '@/components/global/ImageWithPlaceholder';
import { PrimaryPagination } from '@/components/global/pagination/primary-pagination';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableCellException,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useAdminDeletedCourseList } from '@/hooks/use-course-context';
import { formatDate } from '@/lib/utils';
import { AdminDeletedCourseListFilter } from './admin-deleted-course-list-filter';

const getCourseLevelText = (level: number | string) => {
    const levelNumber = typeof level === 'string' ? parseInt(level) : level;
    switch (levelNumber) {
        case 0:
            return 'Beginner';
        case 1:
            return 'Intermediate';
        case 2:
            return 'Advanced';
        case 3:
            return 'Expert';
        default:
            return 'Unknown';
    }
};

const getCourseLevelVariant = (level: number) => {
    switch (level) {
        case 0:
            return 'secondary';
        case 1:
            return 'default';
        case 2:
            return 'outline';
        case 3:
            return 'destructive';
        default:
            return 'secondary';
    }
};

export const AdminDeletedCourseList = () => {
    const { setFilter, items, meta, isFetching } = useAdminDeletedCourseList();

    return (
        <div className="space-y-8">
            <AdminDeletedCourseListFilter />
            <PrimaryPagination
                meta={{
                    page: meta?.page,
                    totalPages: meta?.totalPages,
                    hasNext: meta?.hasNext,
                    hasPrevious: meta?.hasPrevious,
                    totalCount: meta?.totalCount,
                }}
                onPageChange={page => {
                    setFilter(prev => ({ ...prev, page }));
                }}
            />
            <div className="overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="min-w-[250px]">
                                    Course
                                </TableHead>
                                <TableHead className="min-w-[100px]">
                                    Category
                                </TableHead>
                                <TableHead className="min-w-[100px]">
                                    Level
                                </TableHead>
                                <TableHead className="min-w-[80px]">
                                    Duration
                                </TableHead>
                                <TableHead className="min-w-[80px]">
                                    Modules
                                </TableHead>
                                <TableHead className="min-w-[80px]">
                                    Lessons
                                </TableHead>
                                <TableHead className="min-w-[120px]">
                                    Deleted Date
                                </TableHead>
                                <TableHead className="min-w-[100px]">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isFetching ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <Skeleton className="h-12 w-12 rounded" />
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-[180px]" />
                                                    <Skeleton className="h-3 w-[120px]" />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-[80px]" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-6 w-[70px] rounded-md" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-[60px]" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-[40px]" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-[40px]" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-4 w-[100px]" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-8 w-[80px] rounded-md" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : items?.length ? (
                                items?.map(course => (
                                    <TableRow key={course.courseId}>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <AspectRatio ratio={16 / 8}>
                                                    <ImageWithPlaceholder
                                                        width={200}
                                                        height={100}
                                                        src={
                                                            course.courseImageUrl
                                                        }
                                                        alt={course.courseName}
                                                        className="h-full w-full rounded object-cover object-center"
                                                    />
                                                </AspectRatio>
                                                <div>
                                                    <div className="text-sm font-medium">
                                                        {course.courseName}
                                                    </div>
                                                    <div className="text-muted-foreground line-clamp-1 max-w-[200px] text-xs">
                                                        {
                                                            course.courseDescription
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCellException
                                            value={course.category.categoryName}
                                        >
                                            <div className="text-sm">
                                                {course.category.categoryName}
                                            </div>
                                        </TableCellException>
                                        <TableCellException
                                            value={course.courseLevel}
                                        >
                                            <Badge
                                                variant={getCourseLevelVariant(
                                                    course.courseLevel
                                                )}
                                            >
                                                {getCourseLevelText(
                                                    course.courseLevel
                                                )}
                                            </Badge>
                                        </TableCellException>
                                        <TableCellException
                                            value={course.courseDuration}
                                        >
                                            <div className="text-sm">
                                                {course.courseDuration} min
                                            </div>
                                        </TableCellException>
                                        <TableCellException
                                            value={course.moduleCount}
                                        >
                                            <div className="text-sm">
                                                {course.moduleCount}
                                            </div>
                                        </TableCellException>
                                        <TableCellException
                                            value={course.lessonCount}
                                        >
                                            <div className="text-sm">
                                                {course.lessonCount}
                                            </div>
                                        </TableCellException>
                                        <TableCellException
                                            value={course.deletedAt}
                                        >
                                            <div className="text-muted-foreground text-sm">
                                                {course.deletedAt
                                                    ? formatDate(
                                                          course.deletedAt,
                                                          'medium'
                                                      )
                                                    : '--'}
                                            </div>
                                        </TableCellException>
                                        <TableCell>
                                            <div className="text-muted-foreground text-sm">
                                                {/* Future: Add restore/view actions here */}
                                                --
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="text-muted-foreground py-12 text-center"
                                    >
                                        No deleted courses found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <PrimaryPagination
                meta={{
                    page: meta?.page,
                    totalPages: meta?.totalPages,
                    hasNext: meta?.hasNext,
                    hasPrevious: meta?.hasPrevious,
                    totalCount: meta?.totalCount,
                }}
                onPageChange={page => {
                    setFilter(prev => ({ ...prev, page }));
                }}
            />
        </div>
    );
};
