import { AdminCategoryListProvider } from './category-management.provider';
import { CourseManagementProvider } from './course-management.provider';
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
                    {' '}
                    <CourseManagementProvider>
                        {children}
                    </CourseManagementProvider>
                </AdminCategoryListProvider>
            </ReactQueryProvider>
        </ThemeProvider>
    );
};
