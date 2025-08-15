import { AdminCategoryListProvider } from './category-management.provider';
import { CourseManagementProvider } from './course-management.provider';
import { AdminDeletedCategoryListProvider } from './deleted-category-management.provider';
import { ReactQueryProvider } from './react-query.provider';
import { ThemeProvider } from './theme.provider';

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ReactQueryProvider>
                <AdminCategoryListProvider>
                    <AdminDeletedCategoryListProvider>
                        <CourseManagementProvider>
                            {children}
                        </CourseManagementProvider>
                    </AdminDeletedCategoryListProvider>
                </AdminCategoryListProvider>
            </ReactQueryProvider>
        </ThemeProvider>
    );
};
