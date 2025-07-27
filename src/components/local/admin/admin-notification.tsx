import { Bell } from 'lucide-react';
import { Button } from '../../ui/button';

export const AdminNotification = () => {
    return (
        <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-4" />
        </Button>
    );
};
