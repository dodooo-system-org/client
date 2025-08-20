'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const navs = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About us', path: '/about-us' },
    { name: 'Contact', path: '/contact' },
];

export const Header = () => {
    const pathname = usePathname();
    return (
        <header className="shadow">
            <div className="container mx-auto flex items-center justify-between py-4">
                <Link href="/">
                    <Image
                        className="h-10 w-10"
                        src="/logo-icon.jpg"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                </Link>
                <nav>
                    {navs.map(nav => (
                        <Link
                            key={nav.name}
                            href={nav.path}
                            className={cn(
                                'text-primary px-4 py-2',
                                pathname === nav.path
                                    ? 'border-primary border-b-2 font-bold'
                                    : 'font-normal'
                            )}
                        >
                            {nav.name}
                        </Link>
                    ))}
                </nav>
                <div className="space-x-2">
                    <Button variant="ghost" className="hover:bg-third/50">
                        Sign in
                    </Button>
                    <Button>Get started</Button>
                </div>
            </div>
        </header>
    );
};
