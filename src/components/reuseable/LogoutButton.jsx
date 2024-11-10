import axios from "axios";
import { API_ENDPOINTS } from "../../utils/api";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { removeNotebooks } from "../../store/slices/notebookSlice";

const LogoutButton = () => {

  const dispatch = useDispatch();

  const handleLogout = async () => {
    const options = {
      method: 'POST',
      url: API_ENDPOINTS.logout,
      headers: {
        "Content-Type": "application/json",
        accept: 'application/json'
      },
      withCredentials: true,  // Include credentials (cookies) in the request
    };
    try {
      const response = await axios.request(options);
      dispatch(logout())
      dispatch(removeNotebooks())
      console.log(response.data);
    } catch (error) {
      console.log("Logout error", error)
    }
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-red-500 w-full font-medium text-base rounded-sm px-4 py-1"
      >
        Logout <i className="ri-logout-box-r-line"></i>
      </button>
    </div>
  )
}

export default LogoutButton
