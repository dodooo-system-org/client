import { api } from '@/configs/axios.config';
import { API_ENDPOINTS } from '@/constants';
import { Request } from '@/types/apis/request';
import { MetaPagination } from '@/types/apis/response';
import { CoursePreview } from '@/types/objects';
import { UploadAPI } from './upload';

const publicEndpoint = `${API_ENDPOINTS.COURSE_SERVICE.PUBLIC}/course`;
const protectedEndpoint = `${API_ENDPOINTS.COURSE_SERVICE.PROTECTED}/course`;

class CourseAPI {
    private readonly uploadAPI;

    constructor() {
        this.uploadAPI = new UploadAPI(API_ENDPOINTS.COURSE_SERVICE.PROTECTED);
    }

    public async getListCourses(requestPayload: Request.AdminGetListCourses) {
        const response = await api.get<MetaPagination<CoursePreview>>(
            protectedEndpoint,
            {
                params: requestPayload,
            }
        );
        return response.data;
    }

    public async createCourse(requestPayload: Request.AdminCreateCourse) {
        const response = await api.post<CoursePreview>(
            protectedEndpoint,
            requestPayload
        );
        return response.data;
    }

    public uploadImage = async (file: File): Promise<string> => {
        const signature = await this.uploadAPI.getSignature();
        return await this.uploadAPI.uploadImage(file, signature, '/course');
    };
}

const courseAPI = new CourseAPI();

export { courseAPI };
