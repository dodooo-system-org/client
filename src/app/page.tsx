<<<<<<< HEAD
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    ArrowRight,
    Award,
    BookOpen,
    Clock,
    Play,
    Star,
    Users,
    Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Header/Navigation */}
            <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 border-b backdrop-blur">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Image
                                src="/logo-icon.jpg"
                                alt="Dodooo Logo"
                                width={30}
                                height={30}
                            />
                            <span className="text-2xl font-bold">Dodooo</span>
                        </div>
                        <nav className="hidden items-center space-x-6 md:flex">
                            <Link
                                href="#courses"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Courses
                            </Link>
                            <Link
                                href="#categories"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Categories
                            </Link>
                            <Link
                                href="#about"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                About
                            </Link>
                            <Button asChild>
                                <Link href="/admin">Get Started</Link>
                            </Button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="from-background to-muted/20 bg-gradient-to-br py-20 lg:py-32">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <Badge variant="outline" className="mb-4">
                            <Zap className="mr-2 h-4 w-4" />
                            Interactive Learning Platform
                        </Badge>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                            Master New Skills with&nbsp;
                            <span className="text-primary">
                                Expert-Led Courses
                            </span>
                        </h1>
                        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
                            Discover a world of knowledge with our comprehensive
                            course library. Learn at your own pace from industry
                            experts and advance your career.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Button size="lg" asChild>
                                <Link href="/admin/courses">
                                    Explore Courses
                                    <ArrowRight />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline">
                                <Play />
                                Watch Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            Why Choose Dodooo?
                        </h2>
                        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                            We provide everything you need to succeed in your
                            learning journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="p-6 text-center transition-shadow hover:shadow-lg">
                            <CardContent className="pt-6">
                                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <BookOpen className="text-primary h-8 w-8" />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    Diverse Course Library
                                </h3>
                                <p className="text-muted-foreground">
                                    Access hundreds of courses across multiple
                                    categories and skill levels
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="p-6 text-center transition-shadow hover:shadow-lg">
                            <CardContent className="pt-6">
                                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <Clock className="text-primary h-8 w-8" />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    Learn at Your Pace
                                </h3>
                                <p className="text-muted-foreground">
                                    Flexible learning schedules that fit your
                                    lifestyle and commitments
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="p-6 text-center transition-shadow hover:shadow-lg">
                            <CardContent className="pt-6">
                                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <Users className="text-primary h-8 w-8" />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    Expert Instructors
                                </h3>
                                <p className="text-muted-foreground">
                                    Learn from industry professionals with
                                    real-world experience
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="p-6 text-center transition-shadow hover:shadow-lg">
                            <CardContent className="pt-6">
                                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <Award className="text-primary h-8 w-8" />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    Skill Levels
                                </h3>
                                <p className="text-muted-foreground">
                                    From beginner to expert - find courses that
                                    match your current level
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="p-6 text-center transition-shadow hover:shadow-lg">
                            <CardContent className="pt-6">
                                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <Star className="text-primary h-8 w-8" />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    Quality Content
                                </h3>
                                <p className="text-muted-foreground">
                                    High-quality video lessons, assignments, and
                                    interactive content
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="p-6 text-center transition-shadow hover:shadow-lg">
                            <CardContent className="pt-6">
                                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                                    <Zap className="text-primary h-8 w-8" />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold">
                                    Interactive Learning
                                </h3>
                                <p className="text-muted-foreground">
                                    Engage with hands-on projects and practical
                                    exercises
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-muted/20 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                        <div>
                            <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
                                1000+
                            </div>
                            <p className="text-muted-foreground">
                                Courses Available
                            </p>
                        </div>
                        <div>
                            <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
                                50+
                            </div>
                            <p className="text-muted-foreground">
                                Course Categories
                            </p>
                        </div>
                        <div>
                            <div className="text-primary mb-2 text-4xl font-bold md:text-5xl">
                                10k+
                            </div>
                            <p className="text-muted-foreground">
                                Happy Learners
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <Card className="from-primary to-primary/80 text-primary-foreground bg-gradient-to-r">
                        <CardContent className="p-8 text-center lg:p-12">
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                                Ready to Start Learning?
                            </h2>
                            <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
                                Join thousands of learners who are already
                                advancing their careers with our courses
                            </p>
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/admin/courses">
                                    Browse All Courses
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background border-t py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div>
                            <div className="mb-4 flex items-center space-x-2">
                                <Image
                                    src="/logo-icon.jpg"
                                    alt="Dodooo Logo"
                                    width={40}
                                    height={40}
                                />
                                <span className="text-xl font-bold">
                                    Dodooo
                                </span>
                            </div>
                            <p className="text-muted-foreground">
                                Your gateway to knowledge and skill development
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">Platform</h4>
                            <ul className="text-muted-foreground space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="/admin/courses"
                                        className="hover:text-foreground transition-colors"
                                    >
                                        Browse Courses
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/admin/categories"
                                        className="hover:text-foreground transition-colors"
                                    >
                                        Categories
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-foreground transition-colors"
                                    >
                                        Instructors
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">Support</h4>
                            <ul className="text-muted-foreground space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-foreground transition-colors"
                                    >
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-foreground transition-colors"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-foreground transition-colors"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">Company</h4>
                            <ul className="text-muted-foreground space-y-2 text-sm">
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-foreground transition-colors"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-foreground transition-colors"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="hover:text-foreground transition-colors"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-muted-foreground mt-8 border-t pt-8 text-center">
                        <p>&copy; 2025 Dodooo. All rights reserved.</p>
                    </div>
                </div>
            </footer>
=======
import { BestFeedback } from '@/components/local/home/best-feedbacks';
import { CourseCategories } from '@/components/local/home/course-categories';
import { CTASection } from '@/components/local/home/cta-section';
import { HeroSection } from '@/components/local/home/hero-section';

export default function Home() {
    return (
        <div>
            <HeroSection />
            <CourseCategories />
            <BestFeedback />
            <CTASection />
>>>>>>> fdf7f40 (feat: home/landing page)
        </div>
    );
}
