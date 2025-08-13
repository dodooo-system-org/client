import { api } from '@/configs/axios.config';
import { API_ENDPOINTS } from '@/constants';
import { Request } from '@/types/apis/request';
import { MetaPagination } from '@/types/apis/response';
import { Category } from '@/types/objects';
import { UploadAPI } from './upload';

const publicEndpoint = `${API_ENDPOINTS.COURSE_SERVICE.PUBLIC}/category`;
const protectedEndpoint = `${API_ENDPOINTS.COURSE_SERVICE.PROTECTED}/category`;

class CategoryAPI {
    private readonly uploadAPI;
    constructor() {
        this.uploadAPI = new UploadAPI(API_ENDPOINTS.COURSE_SERVICE.PROTECTED);
    }
    async getListAvailableCategories() {
        const response = await api.get<Category[]>(
            `${protectedEndpoint}/available`
        );
        return response.data;
    }
    async createCategory(
        category: Pick<
            Category,
            'categoryName' | 'categoryDescription' | 'categoryImageUrl'
        >
    ) {
        const response = await api.post<Category>(
            `${protectedEndpoint}`,
            category
        );
        return response.data;
    }
    async getListCategories(payload: Request.AdminGetListCategories) {
        const response = await api.get<
            MetaPagination<Category & { appliedInCoursesCount: number }>
        >(`${protectedEndpoint}`, {
            params: payload,
        });
        return response.data;
    }
    public uploadImage = async (file: File): Promise<string> => {
        const signature = await this.uploadAPI.getSignature();
        return await this.uploadAPI.uploadImage(file, signature, '/category');
    };
}

const categoryAPI = new CategoryAPI();

export { categoryAPI };
