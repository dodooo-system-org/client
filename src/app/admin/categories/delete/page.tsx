import { AdminDeletedCategoryList } from '@/components/local/admin/admin-deleted-category-list';

export default function AdminDeletedCategoryPage() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <p>Manage your categories here.</p>
                </div>
            </div>
            <div>
                <AdminDeletedCategoryList />
            </div>
        </div>
    );
}
