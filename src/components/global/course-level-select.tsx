import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CoursePreview } from '@/types/objects';
import { memo } from 'react';

type CourseLevelSelectProps = {
    value?: Pick<CoursePreview, 'courseLevel'>['courseLevel'];
    onValueChange?: (level: number) => void;
};

export const CourseLevelSelect = memo(
    ({ value, onValueChange }: CourseLevelSelectProps) => {
        return (
            <Select
                value={value?.toString()}
                onValueChange={level => onValueChange?.(Number(level))}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select level..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0">Beginner</SelectItem>
                    <SelectItem value="1">Intermediate</SelectItem>
                    <SelectItem value="2">Advanced</SelectItem>
                    <SelectItem value="3">Expert</SelectItem>
                </SelectContent>
            </Select>
        );
    }
);

CourseLevelSelect.displayName = 'CourseLevelSelect';
