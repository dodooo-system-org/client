import { api } from '@/configs/axios.config';
import { API_ENDPOINTS } from '@/constants';
import { Request } from '@/types/apis/request';
import { MetaPagination } from '@/types/apis/response';
import { CoursePreview } from '@/types/objects';

const publicEndpoint = `${API_ENDPOINTS.COURSE_SERVICE.PUBLIC}/course`;
const protectedEndpoint = `${API_ENDPOINTS.COURSE_SERVICE.PROTECTED}/course`;

class CourseAPI {
    public static async getListCourses(
        requestPayload: Request.AdminGetListCourses
    ) {
        const response = await api.get<MetaPagination<CoursePreview>>(
            protectedEndpoint,
            {
                params: requestPayload,
            }
        );
        return response.data;
    }

    public static async createCourse(
        requestPayload: Request.AdminCreateCourse
    ) {
        const response = await api.post<CoursePreview>(protectedEndpoint, {
            ...requestPayload,
            courseImageUrl:
                'https://placehold.co/800x400?font=lato&text=Dodoo+course',
        });
        return response.data;
    }
}

export { CourseAPI };
