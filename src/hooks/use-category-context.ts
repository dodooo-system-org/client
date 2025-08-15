'use client';

import { AdminCategoryListContext } from '@/components/providers/category-management.provider';
import { AdminDeletedCategoryListContext } from '@/components/providers/deleted-category-management.provider';
import { useContext } from 'react';

export const useAdminCategoryList = () => {
    const context = useContext(AdminCategoryListContext);
    if (!context) {
        throw new Error(
            'useAdminCategoryList must be used within AdminCategoryListProvider'
        );
    }
    return context;
};

export const useAdminDeletedCategoryList = () => {
    const context = useContext(AdminDeletedCategoryListContext);
    if (!context) {
        throw new Error(
            'useAdminDeletedCategoryList must be used within AdminDeletedCategoryListProvider'
        );
    }
    return context;
};
