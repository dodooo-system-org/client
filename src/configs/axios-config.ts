import axios from 'axios';

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

        // Customize based on your API's error structure
        if (status === 401) {
            console.error('Unauthorized: Token may be expired or invalid');
            // Optionally redirect to login
        } else if (status === 403) {
            console.error('Forbidden: You do not have permission');
        } else if (status === 500) {
            console.error('Server error, please try again later');
        } else {
            console.error(
                'API error:',
                error.response?.data?.message || error.message
            );
        }

        return Promise.reject(error);
    }
);

export { api };
