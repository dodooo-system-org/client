export const LOCAL_STORAGE_KEY = {
    ADMIN: {
        BREADCRUMBS: 'admin_breadcrumbs',
    },
};

export const API_ENDPOINTS = {
    COURSE_SERVICE: {
        PUBLIC: '/course-service/public/api',
        PROTECTED: '/course-service/protected/api',
    },
};

export const REACT_QUERY_KEYS = {
    ADMIN: {
        ALL_COURSES: 'all-courses',
        AVAILABLE_CATEGORIES: 'available-categories',
    },
};

export const DEFAULT_FUNCTION = () => {
    console.warn(
        'Default function called, please provide a specific implementation.'
    );
};
