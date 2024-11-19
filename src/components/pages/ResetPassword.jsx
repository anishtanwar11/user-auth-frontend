import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/api";
import InputField from "../reuseable/InputField";
import SubmitButtom from "../reuseable/SubmitButton.jsx"

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Check if the newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      setLoading(false);
      setMessageType('error');
      setMessage("Password & Confirm Password must match");
      return; // Stop the form submission if passwords don't match
    }

    try {
      const response = await axios.post(`${API_ENDPOINTS.resetPassword}/${resetToken}`, { newPassword })

      setLoading(false)
      setMessageType('success')
      setMessage(response.data.message || "Password reset successfully")
      setNewPassword("")
      setTimeout(() => {
        navigate("/signin")
      }, 1000);
    } catch (error) {
      setLoading(false)
      setMessageType('error')
      setMessage(error.response.data.message || "An error occured during reset password")
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col px-3">
      <form onSubmit={handleSubmit} className=" flex  flex-col font-[helvetica1] gap-y-4 w-full max-w-[450px]">
        <div>
          <h1 className="text-[2rem] font-medium mb-2">Reset Password</h1>
        </div>

        <div className="flex flex-col bg-[#121212] px-5 py-8 rounded-xl gap-y-4">

          {message &&
            <p className={`${messageType === 'success'
              ? "border-[1px] border-dashed text-center rounded-full text-sm px-4 py-2 text-green-400  border-green-500"
              : "border-[1px] border-dashed text-center rounded-full text-sm p-2 text-red-400  border-red-500"}`}>
              {message}
            </p>
          }

          <InputField
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            name="userPassword"
            placeholder="New Password"
          />

          <InputField
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="userPassword"
            placeholder="Confirm Password"
          />

          <SubmitButtom loading={loading} text="Reset Password" />
        </div>
      </form>

    </div>
  )
}

export default ResetPassword
