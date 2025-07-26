import { api } from '@/configs/axios-config';
import { API_ENDPOINTS } from '@/constants';
import { MetaPagination } from '@/types/apis/response';
import { CoursePreview } from '@/types/objects';

const publicEndpoint = `${API_ENDPOINTS.COURSE_SERVICE.PUBLIC}/course`;
const protectedEndpoint = `${API_ENDPOINTS.COURSE_SERVICE.PROTECTED}/course`;

class CourseAPI {
    public static async getListCourses() {
        const response =
            await api.get<MetaPagination<CoursePreview>>(protectedEndpoint);
        return response.data;
    }
}

export { CourseAPI };
