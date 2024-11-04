import axios from "axios"
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/api";
import SubmitButton from "../reuseable/SubmitButton";
import ResponseMessage from "../reuseable/ResponseMessage";
import { toast } from "react-toastify";

const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(API_ENDPOINTS.login,
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      )

      setMessageType('success')
      // setMessage(response.data.message || 'Successfully logged in!')
      toast.success(response.data.message);

      const data = response.data.data.user;
      dispatch(login(data))
      console.log("user-", data);
      setLoading(false)
      navigate('/user-dashboard')
    } catch (error) {
      setLoading(false)
      console.log("error", error)
      setMessageType('error')
      setMessage(error.response?.data.message || 'An error occured during login user!!')
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-y-4">
      <form onSubmit={handleSubmit}
        className=" flex  flex-col font-[helvetica1] gap-y-8 w-full max-w-[450px]">
        <div>
          <h1 className="text-[2rem] font-medium leading-9">Sign In</h1>
          <p className="text-sm text-gray-400 font-normal">New user?<span className="text-blue-600"><Link to="/signup"> Create an account</Link></span></p>
        </div>

        <ResponseMessage message={message} messageType={messageType} />

        <div className={`${message === '' ? "flex flex-col rounded-xl mt-8 gap-y-4" : "flex flex-col rounded-xl gap-y-4"}`}>
          <div className="w-full">
            <label className="flex flex-col text-gray-500 text-sm ">Email address</label>
            <input
              value={formData.email}
              onChange={handleInput}
              type="email"
              name="email"
              className="w-full bg-transparent border-b-[1px] border-gray-500 px-1 py-1 outline-none rounded-sm text-sm placeholder:text-xs placeholder:text-gray-600 placeholder:font-normal"
            />
          </div>

          <div className="w-full">
            <label className="flex flex-col text-gray-500 text-sm">Password</label>
            <input
              value={formData.password}
              onChange={handleInput}
              type="password"
              name="password"
              className="w-full bg-transparent border-b-[1px] border-gray-500 px-1 py-1 outline-none rounded-sm text-sm placeholder:text-xs placeholder:text-gray-600 placeholder:font-normal"
            />
          </div>

          <SubmitButton loading={loading} text="Continue"/>
        </div>

      </form>

      <div className="border-t-[1px] border-gray-500 w-full max-w-[450px] text-center py-4 mt-4 relative">
        <div className="absolute top-[-13px] left-[47%] bg-[#0d100c] p-1 text-xs text-gray-400">Or</div>
        <Link to="/forgot-password">
        <u className="cursor-pointer text-gray-600 text-sm font-normal">Forgot Password?</u>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
