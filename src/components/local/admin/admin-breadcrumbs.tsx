'use client';

import { LOCAL_STORAGE_KEY } from '@/constants';
import { useLocalStorage } from '@/hooks/use-local-storage';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../../ui/breadcrumb';

const pathLabels = new Map<string, string>([
    ['/admin', 'Home'],
    ['/admin/courses', 'All Courses'],
]);

type BreadcrumbItemType = {
    label: string;
    path: string;
    isLast: boolean;
};
export const AdminBreadcrumbs = () => {
    const path = usePathname();
    const [storedBreadcrumbs, setStoredBreadcrumbs] = useLocalStorage<
        Record<string, BreadcrumbItemType[]>
    >(LOCAL_STORAGE_KEY.ADMIN.BREADCRUMBS, {});

    // Generate breadcrumb items from the current path
    const generateBreadcrumbs = () => {
        if (storedBreadcrumbs && storedBreadcrumbs?.[path]) {
            return storedBreadcrumbs[path] as BreadcrumbItemType[];
        }

        const pathSegments = path.split('/').filter(Boolean);
        const breadcrumbs: BreadcrumbItemType[] = [];

        // Always start with /admin as the root
        if (pathSegments.length > 0 && pathSegments[0] === 'admin') {
            for (let i = 0; i < pathSegments.length; i++) {
                const currentPath = `/${pathSegments.slice(0, i + 1).join('/')}`;
                const label = pathLabels.get(currentPath) || '...';
                const isLast = i === pathSegments.length - 1;
                breadcrumbs.push({
                    label,
                    path: currentPath,
                    isLast,
                });
            }
        }

        // If the path is not in the stored breadcrumbs, save it
        setStoredBreadcrumbs({ ...storedBreadcrumbs, [path]: breadcrumbs });

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.path} className="flex items-center">
                        <BreadcrumbItem
                            className={index === 0 ? 'hidden md:block' : ''}
                        >
                            {crumb.isLast ? (
                                <BreadcrumbPage className="font-semibold">
                                    {crumb.label}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={crumb.path}>{crumb.label}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {!crumb.isLast && (
                            <BreadcrumbSeparator
                                className={index === 0 ? 'hidden md:block' : ''}
                            />
                        )}
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
