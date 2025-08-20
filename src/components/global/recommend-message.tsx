'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

export const RecommendMessage = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    return isVisible ? (
        <div className="bg-primary text-primary-foreground relative py-2 text-center">
            <p className="text-sm">
                {process.env.NEXT_PUBLIC_WEBSITE_RECOMMENDED_MESSAGE}
            </p>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute top-1/2 right-2 -translate-y-1/2"
            >
                <X />
            </button>
        </div>
    ) : null;
};
