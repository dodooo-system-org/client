import axios from 'axios';
import Error from 'next/error';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
});

api.interceptors.request.use(
    config => {
        const token =
            localStorage.getItem('accessToken') ||
            process.env.NEXT_PUBLIC_ADMIN_TOKEN_TEST;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response Interceptor: Handle Errors Globally
api.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status;
        console.log(status);

        const controlledErrorStatuses = [400, 401, 403, 404, 409, 500];
        let handledError: Error;
        if (controlledErrorStatuses.includes(status)) {
            handledError = new Error({
                statusCode: status,
                title: error.response?.data?.error || 'An error occurred',
            });
        } else {
            handledError = new Error({
                statusCode: 500,
                title: 'An error occurred',
            });
        }

        return Promise.reject(handledError);
    }
);

export { api };
