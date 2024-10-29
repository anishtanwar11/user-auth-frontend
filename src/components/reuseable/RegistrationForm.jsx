import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/api";

const RegistrationForm = () => {

  const navigate = useNavigate();
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINTS.register, formData)
      setMessage(response?.data?.message || 'Successfully registered!')
      setMessageType('success')
      setFormData({
        fullName: "",
        email: "",
        password: ""
      })

      setTimeout(() => {
        navigate("/signin")
      }, 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during registration';
      setMessage(errorMessage);
      setMessageType('error')
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}
        className=" flex  flex-col font-[helvetica1] gap-y-8 w-full max-w-[450px]">
        <div>
          <h1 className="text-[2rem] font-medium leading-9">Sign Up</h1>
          <p className="text-sm text-gray-400 font-normal">Already have an account?<span className="text-blue-600"><Link to="/signin"> Sign in</Link></span></p>
        </div>

        <div className="flex flex-col bg-[#121212] px-5 py-8 rounded-xl gap-y-4">

          {message &&
            <p className={`${messageType === 'success'
              ? "border-[1px] border-dashed text-center rounded-full text-sm p-2 text-green-400  border-green-500"
              : "border-[1px] border-dashed text-center rounded-full text-sm p-2 text-red-400  border-red-500"}`}>
              {message}
            </p>
          }
          <div className="w-full">
            <label className="flex flex-col text-gray-500 text-sm leading-9">Full Name</label>
            <input
              value={formData.fullName}
              onChange={handleInput}
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full bg-[#1E1E1E] px-4 py-2 outline-none rounded-sm text-sm placeholder:text-xs placeholder:text-gray-600 placeholder:font-normal"
            />
          </div>

          <div className="w-full">
            <label className="flex flex-col text-gray-500 text-sm leading-9">Email</label>
            <input
              value={formData.email}
              onChange={handleInput}
              type="email"
              name="email"
              placeholder="Email"
              className="w-full bg-[#1E1E1E] px-4 py-2 outline-none rounded-sm text-sm placeholder:text-xs placeholder:text-gray-600 placeholder:font-normal"
            />
          </div>

          <div className="w-full">
            <label className="flex flex-col text-gray-500 text-sm leading-9">Password</label>
            <input
              value={formData.password}
              onChange={handleInput}
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-[#1E1E1E] px-4 py-2 outline-none rounded-sm text-sm placeholder:text-xs placeholder:text-gray-600 placeholder:font-normal"
            />
          </div>
          <button className="bg-[#24CFA6] text-black font-medium text-sm p-2 rounded-sm mt-2">Create Account</button>
        </div>

      </form>

    </div>
  )
}

export default RegistrationForm
