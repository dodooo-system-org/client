import { ButtonLink } from '@/components/ui/button';
import { ArrowRight, CheckCircle, RefreshCwOff } from 'lucide-react';
import { memo } from 'react';

export const CTASection = memo(() => {
    return (
        <section className="bg-primary py-12 lg:py-24">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <h2 className="text-primary-foreground mb-6 text-4xl font-bold">
                    Ready to Start Your Learning Journey?
                </h2>
                <p className="text-primary-foreground mb-8 max-w-2xl text-center text-lg">
                    Join over 50,000 students who are already learning and
                    growing with {process.env.NEXT_PUBLIC_WEBSITE_NAME}. Start
                    your first course today and unlock your potential.
                </p>
                <div className="mb-12 flex items-center gap-8">
                    <ButtonLink
                        icon={<ArrowRight className="h-4 w-4" />}
                        iconPosition="end"
                        href="/"
                        className="border-third text-primary bg-third w-fit rounded-lg border px-4 py-1 text-lg transition-opacity hover:opacity-80"
                    >
                        Start Free Trial
                    </ButtonLink>
                    <ButtonLink
                        href="/courses"
                        className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-fit rounded-lg border px-4 py-1 text-lg transition-colors"
                    >
                        View All Courses
                    </ButtonLink>
                </div>
                <div className="flex items-center gap-8">
                    <div className="text-primary-foreground flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm">7-day free trial</span>
                    </div>
                    <div className="text-primary-foreground flex items-center gap-2">
                        <RefreshCwOff className="h-5 w-5" />
                        <span className="text-sm">Cancel anytime</span>
                    </div>
                    <div className="text-primary-foreground flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm">
                            Certificate of completion
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
});

CTASection.displayName = 'CTASection';
