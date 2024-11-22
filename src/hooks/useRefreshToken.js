import axios from "axios";
import { useEffect } from "react";
import { API_ENDPOINTS } from "../utils/api";
const useRefreshToken = () => {

    useEffect(() => {
        const refreshAccessToken = async() => {
            try {
                const response = await axios.post(API_ENDPOINTS.refreshToken, {}, { withCredentials: true });
                console.log("response=", response.data.message);
            } catch (error) {
                console.error(error.response.data.message || "Failed to refresh access token:");
            }
        };

        refreshAccessToken();
    },[])
}

export default useRefreshToken
