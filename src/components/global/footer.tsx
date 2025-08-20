import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-muted border-border border-t">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-2">
                        <Link
                            href="/"
                            className="mb-4 flex items-center space-x-2"
                        >
                            <Image
                                src="/logo-icon.jpg"
                                alt={process.env.NEXT_PUBLIC_WEBSITE_NAME || ''}
                                width={120}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </Link>
                        <p className="text-muted-foreground mb-6 max-w-md text-pretty">
                            Empowering learners worldwide with high-quality
                            courses across multiple categories. Start your
                            learning journey today and unlock your potential.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-foreground mb-4 font-semibold">
                            Platform
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/courses"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Browse Courses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categories"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/instructors"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Become Instructor
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-foreground mb-4 font-semibold">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/help"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-border mt-8 border-t py-4 text-center">
                <p className="text-muted-foreground">
                    © {new Date().getFullYear()} Dodooo. All rights reserved.
                    Made with ❤️ for learners worldwide.
                </p>
            </div>
        </footer>
    );
}
