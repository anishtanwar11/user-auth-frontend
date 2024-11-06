import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINTS } from "../../utils/api";
import { updateUser } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

import LogoutButton from "../reuseable/LogoutButton.jsx";

const UserDashboard = () => {
  const currentuser = useSelector((state) => state.auth.currentuser);
  const dispatch = useDispatch()

  const [avatar, setAvatar] = useState(currentuser.avatar);
  const [uploadAvatar, setUploadAvatar] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarFilePreview, setAvatarFilePreview] = useState(null);

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (avatarFile) {
      setAvatarFilePreview(URL.createObjectURL(avatarFile));
    }
  }, [avatarFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    setLoading(true)
    try {
      const response = await axios.put(API_ENDPOINTS.avatar, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("Response-", response.data.message);
      toast.success(response.data.message)
      console.log("Response-", response.data.data.avatar);
      const updatedAvatar = response.data.data.avatar;
      dispatch(updateUser({ avatar: updatedAvatar }))
      setAvatar(updatedAvatar); // Assuming the response includes the new avatar URL
      setUploadAvatar(false);
      setAvatarFile(null);
      setAvatarFilePreview(null);
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message)
      console.log("Error-", error.response?.data?.message || error.message);
    }
  };

  const handleCancelButton = () => {
    setUploadAvatar(false);
    setAvatarFile(null);
    setAvatarFilePreview(null);
  };

  const userName = currentuser?.fullName.charAt(0);
  console.log("User-----", currentuser);

  return (
    <div className="px-3 w-screen h-screen flex items-center justify-center relative">
      <div className="w-full max-w-[700px] flex gap-y-10 justify-center flex-col bg-[#121212] px-4 sm:px-20 py-8 rounded-lg">
        <h1 className="text-3xl font-normal font-[neuemachina] text-center sm:text-left">Account Center</h1>
        <div className="flex flex-col text-center sm:text-left gap-y-4 sm:flex-row gap-x-5 items-center">
          <div className="relative">
            <div className={`${avatar ? "w-32 h-32 overflow-hidden rounded-full bg-[#24CFA6]" : "w-32 h-32 overflow-hidden rounded-full items-center justify-center flex bg-[#24CFA6]"}`}>
              {avatar ? (
                <img src={avatar} alt="profile-image" className="" />
              ) : (
                <h1 className="text-6xl font-semibold text-black">{userName}</h1>
              )}
            </div>
            <div onClick={() => setUploadAvatar(true)} className="bg-[#24CFA6] shadow-lg shadow-[#24CFA6] flex items-center justify-center rounded-full w-6 h-6 text-lg font-normal absolute top-2 right-2 cursor-pointer">
              <i className="ri-pencil-line"></i>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-medium">{currentuser.fullName}</h1>
            <h1 className="text-sm font-normal text-gray-400">{currentuser.email}</h1>
          </div>
        </div>

        <div className="flex sm:justify-end justify-center">
          <LogoutButton />
        </div>
      </div>

      {uploadAvatar && (
        <div className="w-screen h-screen bg-black/40 absolute top-0 left-0 flex items-center justify-center">
          <div className="p-6 rounded-xl bg-[#1E1E1E] flex flex-col items-center justify-center gap-y-6">
            <h1 className="text-lg font-bold text-gray-200">Upload Profile Picture</h1>

            <div className="bg-gray-200 w-48 h-48 overflow-hidden">
              <img src={avatarFilePreview || avatar} alt="avatar-image" className="" />
            </div>
            <div className="flex gap-x-6">
              <button onClick={handleCancelButton} className="bg-black rounded-lg px-4 py-2 text-xs font-semibold w-20 ">
                Cancel
              </button>

              <div className="bg-black overflow-hidden rounded-lg py-1 w-20  cursor-pointer flex justify-center items-center">
                {!avatarFilePreview ? (
                  <div className="flex items-center justify-center w-full h-full">
                    <label htmlFor="files" className="text-xs font-semibold cursor-pointer w-full h-full mt-1  text-center">
                      Upload
                    </label>
                    <input
                      onChange={(e) => setAvatarFile(e.target.files[0])}
                      id="files"
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                ) : (
                  <button onClick={handleSubmit} className="text-xs font-semibold w-full">
                    {(loading === false
                      ? "Save"
                      : <div className=" p-0 flex justify-center items-center m-0">
                        <i className="ri-loader-2-fill text-lg animate-spin-slow m-0"></i>
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
