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
}

export { CategoryAPI };
