// const BASE_URL = "http://localhost:8000/api/v1";
const BASE_URL = "https://user-auth-backend-omega.vercel.app/api/v1"

export const API_ENDPOINTS = {
    // AUTH ROUTE
    register: `${BASE_URL}/user/register`,
    login: `${BASE_URL}/user/login`,
    logout: `${BASE_URL}/user/logout`,
    avatar: `${BASE_URL}/user/avatar`,
    forgotPassword: `${BASE_URL}/user/forgot-password`,
    resetPassword: `${BASE_URL}/user/reset-password`,

    // NOTEBOOK ROUTE
    allNotebooks: `${BASE_URL}/notebook/all`,
    createNotebook: `${BASE_URL}/notebook/create`,

    // SECTION ROUTE
    allSections: `${BASE_URL}/notebook`,
    createSection: `${BASE_URL}/notebook`,

    // PAGES ROUTE
    pages: `${BASE_URL}/notebook/section`,
};