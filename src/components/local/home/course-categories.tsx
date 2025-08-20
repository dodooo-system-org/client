import { CardAnimate } from '@/components/ui/card';
import {
    Briefcase,
    Camera,
    Code,
    Heart,
    Languages,
    Music,
    Palette,
    TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

const categories = [
    {
        icon: Code,
        title: 'Programming & Tech',
        description: 'Learn coding, web development, and software engineering',
        courses: '250',
        emoji: '💻',
    },
    {
        icon: Palette,
        title: 'Design & Creative',
        description: 'Master graphic design, UI/UX, and digital arts',
        courses: '180',
        emoji: '🎨',
    },
    {
        icon: TrendingUp,
        title: 'Business & Marketing',
        description: 'Develop business skills and marketing strategies',
        courses: '200',
        emoji: '📈',
    },
    {
        icon: Camera,
        title: 'Photography & Video',
        description: 'Create stunning visuals and video content',
        courses: '120',
        emoji: '📸',
    },
    {
        icon: Music,
        title: 'Music & Audio',
        description: 'Learn instruments, production, and music theory',
        courses: '90',
        emoji: '🎵',
    },
    {
        icon: Languages,
        title: 'Language Learning',
        description: 'Master new languages with native speakers',
        courses: '150',
        emoji: '🌍',
    },
    {
        icon: Briefcase,
        title: 'Professional Skills',
        description: 'Advance your career with essential workplace skills',
        courses: '160',
        emoji: '💼',
    },
    {
        icon: Heart,
        title: 'Health & Wellness',
        description: 'Improve your physical and mental well-being',
        courses: '80',
        emoji: '💪',
    },
];

export const CourseCategories = () => {
    return (
        <section className="from-third/5 to-third/15 bg-gradient-to-b py-20 lg:py-32">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <h2 className="text-primary mb-4 text-4xl font-extrabold">
                    🎯 Choose Your Adventure!
                </h2>
                <p className="text-primary mb-16 max-w-2xl text-center text-lg">
                    🌈 Pick your favorite topic and start an amazing learning
                    journey! Every course is designed to make you awesome! ✨
                </p>
                <div className="grid w-full grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <CardAnimate
                            key={index}
                            className="flex flex-col items-center justify-between"
                        >
                            <div className="bg-third/20 shadow-third/20 group-hover:bg-third/30 relative h-fit w-fit rounded-full p-4 shadow-[0_0_20px_10px] transition-all">
                                <category.icon className="text-primary h-8 w-8" />
                                <span className="absolute -top-1 -right-1 text-xl">
                                    {category.emoji}
                                </span>
                            </div>
                            <div className="space-y-4 text-center">
                                <h3 className="text-primary text-lg font-bold">
                                    {category.title}
                                </h3>
                                <p className="text-primary text-sm">
                                    {category.description}
                                </p>
                                <span className="bg-third/20 rounded-full px-2 py-1 text-sm font-semibold">
                                    🎓 {category.courses} courses
                                </span>
                            </div>
                            <Link
                                href="/"
                                className="border-third/50 group-hover:bg-primary group-hover:text-primary-foreground w-full rounded-full border-2 text-center text-base font-semibold transition-all"
                            >
                                🚀 Let&apos;s go
                            </Link>
                        </CardAnimate>
                    ))}
                </div>
            </div>
        </section>
    );
};
