import { formatDate } from '@/lib/utils';

export const AdminGreeting = () => {
    return (
        <div className="flex flex-col items-start gap-2">
            <p className="text-base font-semibold">Good morning, Admin</p>
            <span className="text-sm">
                Today:&nbsp;
                {formatDate(new Date())}
            </span>
        </div>
    );
};
