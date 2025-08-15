import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { StatusType } from '@/types/common';
import { memo } from 'react';

type StatusSelectProps = {
    value?: StatusType | null;
    onValueChange?: (status: StatusType | null) => void;
    placeholder?: string;
};

export const StatusSelect = memo(
    ({
        value,
        onValueChange,
        placeholder = 'Select status...',
    }: StatusSelectProps) => {
        return (
            <Select
                value={value ?? undefined}
                onValueChange={status => onValueChange?.(status as StatusType)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    {/* <SelectItem value="deleted">Deleted</SelectItem> */}
                </SelectContent>
            </Select>
        );
    }
);

StatusSelect.displayName = 'StatusSelect';
