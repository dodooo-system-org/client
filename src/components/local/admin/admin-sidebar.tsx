'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { Home, Library, LogOut, LucideProps, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LogoLink } from '../../global/logo-link';
import { Button } from '../../ui/button';

type DataType = {
    navMain: Array<{
        title: string;
        url: string;
        icon: ForwardRefExoticComponent<
            Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
        >;
        items: Array<{
            title: string;
            url: string;
        }>;
    }>;
};

const data: DataType = {
    navMain: [
        {
            title: 'Home',
            url: '#',
            icon: Home,
            items: [
                {
                    title: 'Dashboard',
                    url: '/admin',
                },
            ],
        },
        {
            title: 'Course Management',
            url: '#',
            icon: Library,
            items: [
                {
                    title: 'All Courses',
                    url: '/admin/courses',
                },
                {
                    title: 'Featured Courses',
                    url: '#',
                },
            ],
        },
        {
            title: 'User Management',
            url: '#',
            icon: Users,
            items: [
                {
                    title: 'All Users',
                    url: '#',
                },
                {
                    title: 'Potential Users',
                    url: '#',
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="flex items-center justify-between p-1">
                    <LogoLink />
                    <Button
                        size="icon"
                        variant="outline"
                        className="[&_svg]:size-5"
                    >
                        <LogOut />
                    </Button>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map(item => {
                    const Icon = item.icon;
                    return (
                        <SidebarGroup key={item.title}>
                            <SidebarGroupLabel className="flex items-center gap-1">
                                <Icon className="h-4 w-4" /> {item.title}
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {item.items.map(item => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={item.url === pathname}
                                            >
                                                <Link href={item.url}>
                                                    {item.title}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    );
                })}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
