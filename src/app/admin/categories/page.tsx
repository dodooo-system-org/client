import { CategoryCreateDialog } from '@/components/global/category/category-create-dialog';
import { CategoryList } from '@/components/local/admin/admin-category-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Page() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <p>Manage your categories here.</p>
                </div>
                <div>
                    <CategoryCreateDialog
                        triggerNode={
                            <Button>
                                <Plus /> Create Category
                            </Button>
                        }
                    ></CategoryCreateDialog>
                </div>
            </div>
            <div>
                <CategoryList />
            </div>
        </div>
    );
}
