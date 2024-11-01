// const BASE_URL = "http://localhost:8000/api/v1";
const BASE_URL = "https://user-auth-backend-omega.vercel.app/api/v1"

export const API_ENDPOINTS = {
    register: `${BASE_URL}/user/register`,
    login: `${BASE_URL}/user/login`,
    logout: `${BASE_URL}/user/logout`,
};