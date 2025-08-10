declare module '@/types/common' {
    type StatusType = 'active' | 'inactive' | 'deleted';

    type CustomizedDialogProps = {
        isOpen?: boolean;
        onOpenChange?: (open: boolean) => void;
        triggerNode?: React.ReactNode;
        onCreate?: (category: string) => void;
        onDelete?: (category: string) => void;
        onUpdate?: (category: string) => void;
        onCancel?: () => void;
    };

    type FormAction = {
        submit: () => void;
        reset: () => void;
    };
}
