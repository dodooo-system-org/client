import { Rating } from '@/components/global/rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardAnimate } from '@/components/ui/card';

const feedbacks = [
    {
        name: 'Sarah Johnson',
        role: 'Web Developer',
        content:
            'Dodooo transformed my career! The programming courses are incredibly detailed and the instructors are world-class. I landed my dream job within 3 months.',
        rating: 5,
        avatar: '/professional-woman-smiling.png',
        emoji: '💻',
    },
    {
        name: 'Michael Chen',
        role: 'Digital Marketer',
        content:
            'The business and marketing courses on Dodooo are exceptional. The practical approach and real-world examples helped me grow my agency by 300%.',
        rating: 5,
        avatar: '/professional-man-smiling.png',
        emoji: '📈',
    },
    {
        name: 'Emily Rodriguez',
        role: 'UX Designer',
        content:
            'I love how flexible the learning is on Dodooo. The design courses are comprehensive and I could learn at my own pace while working full-time.',
        rating: 5,
        avatar: '/creative-woman-designer.png',
        emoji: '🎨',
    },
];

export const BestFeedback = () => {
    return (
        <section className="py-20 lg:py-32">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <h2 className="text-primary mb-4 text-4xl font-extrabold">
                    💬 Our Learners Are Super Happy!
                </h2>
                <p className="text-primary mb-16 max-w-2xl text-center text-lg">
                    🌟 Join thousands of amazing learners who became superstars
                    with {process.env.NEXT_PUBLIC_WEBSITE_NAME}! Their success
                    stories will inspire you! 🚀
                </p>
                <div className="grid grid-cols-3 gap-8">
                    {feedbacks.map((feedback, index) => (
                        <CardAnimate key={index}>
                            <div className="flex items-center gap-2">
                                <Rating value={feedback.rating} size="large" />
                                <span className="text-third text-sm font-semibold">
                                    Amazing
                                </span>
                            </div>
                            <p className="text-primary text-sm font-stretch-110%">
                                &quot;{feedback.content}&quot;
                            </p>
                            <div className="mt-4 flex items-start gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage
                                        height={100}
                                        width={100}
                                        src={feedback.avatar}
                                        alt={feedback.name}
                                    />
                                    <AvatarFallback>
                                        {feedback.name}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-primary text-base font-bold">
                                        {feedback.name}
                                    </p>
                                    <p className="bg-third/10 w-fit rounded-lg px-1 py-0.5 text-sm">
                                        {feedback.role}
                                    </p>
                                </div>
                            </div>
                        </CardAnimate>
                    ))}
                </div>
            </div>
        </section>
    );
};
