'use client';

import { cn } from '@/lib/utils';
import { Moon, SunDim } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
                <button
                    className="outline-input bg-accent h-5 w-8 rounded-full outline-1"
                    onClick={toggleTheme}
                >
                    <span
                        className={cn(
                            'bg-background block h-5 w-5 rounded-full p-0.5',
                            theme === 'dark' ? 'translate-x-3' : ''
                        )}
                    >
                        {theme === 'dark' ? (
                            <Moon className="size-full" />
                        ) : (
                            <SunDim className="size-full" />
                        )}
                    </span>
                </button>
            </TooltipTrigger>
            <TooltipContent
                className="bg-accent text-foreground shadow"
                arrowClassName="bg-accent fill-accent"
            >
                {theme === 'light' ? (
                    <p>Switch to dark theme</p>
                ) : (
                    <p>Switch to light theme</p>
                )}
            </TooltipContent>
        </Tooltip>
    );
};
