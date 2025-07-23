import { ThemeSwitcher } from '@/components/global/theme-switcher';
import { AdminBreadcrumbs } from '@/components/local/admin-breadcrumbs';
import { AdminGreeting } from '@/components/local/admin-greeting';
import { AdminNotification } from '@/components/local/admin-notification';
import { AppSidebar } from '@/components/local/admin-sidebar';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="bg-background sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <AdminGreeting />
                    </div>
                    <div className="flex items-center gap-2">
                        <AdminNotification />
                        <ThemeSwitcher />
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div>
                        <AdminBreadcrumbs />
                    </div>
                    <div>{children}</div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
