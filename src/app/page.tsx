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
        </div>
    );
}
