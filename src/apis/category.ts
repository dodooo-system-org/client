import { api } from '@/configs/axios.config';
import { API_ENDPOINTS } from '@/constants';
import { Category } from '@/types/objects';

const publicEndpoint = `${API_ENDPOINTS.COURSE_SERVICE.PUBLIC}/category`;
const protectedEndpoint = `${API_ENDPOINTS.COURSE_SERVICE.PROTECTED}/category`;

class CategoryAPI {
    public static async getListAvailableCategories() {
        const response = await api.get<Category[]>(
            `${protectedEndpoint}/available`
        );
        return response.data;
    }
    public static async createCategory(
        category: Pick<
            Category,
            'categoryName' | 'categoryDescription' | 'categoryImageUrl'
        >
    ) {
        const response = await api.post<Category>(`${protectedEndpoint}`, {
            ...category,
            categoryImageUrl:
                'https://placehold.co/800x400?font=lato&text=Dodoo+course',
        });
        return response.data;
    }
}

export { CategoryAPI };
