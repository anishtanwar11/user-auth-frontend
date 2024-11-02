import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/api";
import axios from "axios"

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
      setMessage(response.data.message || 'Successfully logged in!')

      const data = response.data.data.user;
      dispatch(login(data))
      console.log("user-", data);
      setLoading(false)
      setTimeout(() => {
        navigate('/user-dashboard')
      }, 1000);
      
    } catch (error) {
      setLoading(false)
      console.log("error", error)
      setMessageType('error')
      setMessage(error.response?.data.message || 'An error occured duting login user!!')
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}
        className=" flex  flex-col font-[helvetica1] gap-y-8 w-full max-w-[450px]">
        <div>
          <h1 className="text-[2rem] font-medium leading-9">Sign In</h1>
          <p className="text-sm text-gray-400 font-normal">New user?<span className="text-blue-600"><Link to="/signup"> Create an account</Link></span></p>
        </div>

        {message &&
          <p className={`${messageType === 'success'
            ? "border-[1px] border-dashed text-center rounded-full text-sm p-2 text-green-400  border-green-500"
            : "border-[1px] border-dashed text-center rounded-full text-sm p-2 text-red-400  border-red-500"}`}>
            {message}
          </p>
        }

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
          <button className={`${(loading === false) ? "bg-[#24CFA6] text-black font-medium text-sm p-2 rounded-sm mt-2" : "items-center justify-center flex gap-x-2 bg-[#24CFA6] text-black font-medium text-sm p-1 rounded-sm mt-2"}`}>
            {(loading === false
              ? "" 
              : <div className=" p-0 flex justify-center items-center m-0">
                  <i className="ri-loader-2-fill text-lg animate-spin-slow m-0"></i>
                </div>
            )}Continue
          </button>
        </div>

      </form>
    </div>
  )
}

export default LoginForm
