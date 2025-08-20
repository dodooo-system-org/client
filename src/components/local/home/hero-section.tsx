import { BookOpen, GraduationCap, ThumbsUp, Users2 } from 'lucide-react';
import Link from 'next/link';

export const HeroSection = () => {
    return (
        <section className="via-third/10 from-third/0 to-third/30 relative overflow-hidden bg-gradient-to-br py-20 lg:py-32">
            <div className="container mx-auto flex flex-col items-center gap-8 px-4 text-center">
                <div className="bg-third/20 border-third drop shadow-third/20 flex w-fit items-center gap-2 rounded-4xl border-2 px-6 py-4 shadow-[0px_0px_50px_10px]">
                    <GraduationCap className="text-third" />
                    <span className="text-primary text-sm font-bold">
                        🎉 Learn from Amazing Experts
                    </span>
                </div>
                <h1 className="text-primary text-4xl leading-tight font-black text-balance md:text-6xl">
                    🚀 Unlock Your
                    <span className="from-primary to-third bg-gradient-to-r bg-clip-text text-transparent">
                        &nbsp;Super Powers
                    </span>
                    <br />
                    with{' '}
                    <span className="text-third">
                        {process.env.NEXT_PUBLIC_WEBSITE_NAME}!
                    </span>
                </h1>
                <p className="text-primary mb-4 max-w-2xl px-2 text-xl">
                    🌟 Join thousands of amazing learners on an epic adventure!
                    Discover mind-blowing courses, level up your skills, and
                    become the superhero version of yourself! 💪✨
                </p>
                <div className="mb-4 flex items-center gap-4">
                    <Link
                        href="/"
                        className="bg-primary border-primary text-primary-foreground shadow-third/50 rounded-full border-2 px-8 py-1.5 font-bold transition-transform ease-in-out hover:scale-105 hover:rotate-3 hover:shadow-[0px_0px_8px_2px]"
                    >
                        🎯 Start My Adventure
                    </Link>
                    <Link
                        href="/courses"
                        className="bg-third/5 border-third text-primary hover:bg-third shadow-third/50 rounded-full border-2 px-8 py-1.5 font-bold transition-transform ease-in-out hover:scale-105 hover:rotate-3 hover:shadow-[0px_0px_8px_2px]"
                    >
                        🔍 Explore Courses
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-16">
                    <div className="flex flex-col items-center">
                        <div className="bg-third/30 mb-2 h-fit w-fit animate-[bounce_3s_ease-in-out_infinite] rounded-full p-4">
                            <BookOpen className="text-primary h-8 w-8" />
                        </div>
                        <span className="text-primary text-3xl font-extrabold">
                            1000+
                        </span>
                        <span className="text-primary text-sm font-bold">
                            📚 Epic courses
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-third/30 mb-2 h-fit w-fit animate-[bounce_3s_ease-in-out_infinite] rounded-full p-4">
                            <Users2 className="text-primary h-8 w-8" />
                        </div>
                        <span className="text-primary text-3xl font-extrabold">
                            50k
                        </span>
                        <span className="text-primary text-sm font-bold">
                            🎓 Happy students
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-third/30 mb-2 h-fit w-fit animate-[bounce_3s_ease-in-out_infinite] rounded-full p-4">
                            <GraduationCap className="text-primary h-8 w-8" />
                        </div>
                        <span className="text-primary text-3xl font-extrabold">
                            50+
                        </span>
                        <span className="text-primary text-sm font-bold">
                            ⭐️ Expert teachers
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-third/30 mb-2 h-fit w-fit animate-[bounce_3s_ease-in-out_infinite] rounded-full p-4">
                            <ThumbsUp className="text-primary h-8 w-8" />
                        </div>
                        <span className="text-primary text-3xl font-extrabold">
                            80%
                        </span>
                        <span className="text-primary text-sm font-bold">
                            🏅 Positive feedback
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
