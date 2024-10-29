import axios from "axios";
import { API_ENDPOINTS } from "../../utils/api";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const LogoutButton = () => {

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.logout, {}, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      dispatch(logout())
      console.log(response.data);
    } catch (error) {
      console.log("Logout error", error)
    }
  }

  return (
    <div>
      <button onClick={handleLogout} className="bg-[#24CFA6] text-black font-medium text-base rounded-sm px-4 py-1">Logout</button>
    </div>
  )
}

export default LogoutButton
