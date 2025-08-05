import { memo, ReactNode } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { Label } from '../ui/label';

export const FormField = memo(
    ({
        label,
        htmlFor,
        error,
        children,
    }: {
        label: string;
        htmlFor?: string;
        error?: FieldError | Merge<FieldError, FieldErrorsImpl<object>>;
        children: ReactNode;
    }) => (
        <div>
            <Label htmlFor={htmlFor}>{label}</Label>
            {children}
            {error && (
                <p className="text-destructive text-sm">{error.message}</p>
            )}
        </div>
    )
);

FormField.displayName = 'FormField';
