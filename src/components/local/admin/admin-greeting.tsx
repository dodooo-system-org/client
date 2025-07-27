export const AdminGreeting = () => {
    return (
        <div className="flex flex-col items-start gap-2">
            <p className="text-base font-semibold">Good morning, Admin</p>
            <span className="text-sm">
                Today:&nbsp;
                {Intl.DateTimeFormat('en-US', {
                    dateStyle: 'long',
                }).format(new Date())}
            </span>
        </div>
    );
};
