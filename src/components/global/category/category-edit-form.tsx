'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Category } from '@/types/objects';
import { memo, useEffect, useState } from 'react';
import { ImageDropZone } from '../image-drop-zone';

type FormState = Pick<
    Category,
    'categoryName' | 'categoryDescription' | 'categoryImageUrl'
>;

type CategoryEditFormProps = {
    initCategory?: FormState;
    onValueChange?: (category: FormState) => void;
    onSubmit?: (category: FormState) => void;
};

export const CategoryEditForm = memo(
    ({ initCategory, onSubmit, onValueChange }: CategoryEditFormProps) => {
        const [category, setCategory] = useState<FormState>({
            categoryName: initCategory?.categoryName || '',
            categoryDescription: initCategory?.categoryDescription || '',
            categoryImageUrl: initCategory?.categoryImageUrl || '',
        });

        useEffect(() => {
            onValueChange?.(category);
            console.log(category);
        }, [category, onValueChange]); // Update when category changes

        const handleChangeImage = (imageSrc: string) => {
            setCategory(prev => ({
                ...prev,
                categoryImageUrl: imageSrc,
            }));
        };

        const handleChange = (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            const { name, value } = e.target;
            setCategory(prev => ({
                ...prev,
                [name]: value,
            }));
        };

        return (
            <form
                className="flex flex-col gap-4"
                onSubmit={e => {
                    e.preventDefault();
                    console.log('Submitting category:', category);
                    if (onSubmit) {
                        onSubmit({
                            ...category,
                            categoryName: category.categoryName.trim(),
                            categoryDescription:
                                category.categoryDescription.trim(),
                        });
                    }
                }}
            >
                <div>
                    <Label className="pb-1">Category image</Label>
                    <ImageDropZone
                        ratio={16 / 8}
                        onImageDrop={handleChangeImage}
                    />
                </div>
                <div>
                    <Label className="pb-1">Category name</Label>
                    <Input
                        name="categoryName"
                        value={category.categoryName}
                        onChange={handleChange}
                        placeholder="Enter category name"
                    />
                </div>
                <div>
                    <Label className="pb-1">Category description</Label>
                    <Textarea
                        value={category.categoryDescription}
                        onChange={handleChange}
                        name="categoryDescription"
                        className="min-h-[150px] resize-none"
                        placeholder="Enter category description"
                    />
                </div>
            </form>
        );
    }
);

CategoryEditForm.displayName = 'CategoryEditForm';
