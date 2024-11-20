import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/api";
import InputField from "../reuseable/InputField.jsx";
import SubmitButton from "../reuseable/SubmitButton.jsx";

const RegistrationForm = () => {

  const navigate = useNavigate();
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [formData, setFormData] = useState({
    fullName: "",
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
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(API_ENDPOINTS.register, formData)
      setMessage(response?.data?.message || 'Successfully registered!')
      setMessageType('success')
      setFormData({
        fullName: "",
        email: "",
        password: ""
      })
      setLoading(false)
      setTimeout(() => {
        navigate("/signin")
      }, 5000);
    } catch (error) {
      setLoading(false)
      const errorMessage = error.response?.data?.message || 'An error occurred during registration';
      setMessage(errorMessage);
      setMessageType('error')
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit}
        className=" flex  flex-col font-[helvetica1] gap-y-8 w-full max-w-[450px]">
        <div>
          <h1 className="text-[2rem] font-medium leading-9">Sign Up</h1>
          <p className="text-sm text-gray-400 font-normal">Already have an account?<span className="text-blue-600"><Link to="/signin"> Sign in</Link></span></p>
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
            label="Full Name"
            value={formData.fullName}
            onChange={handleInput}
            type="text"
            name="fullName"
            placeholder="Full Name"
          />

          <InputField
            label="Email"
            value={formData.email}
            onChange={handleInput}
            type="email"
            name="email"
            placeholder="Email"
          />

          <InputField
            label="Password"
            value={formData.password}
            onChange={handleInput}
            type="password"
            name="password"
            placeholder="Password"
          />

          <SubmitButton loading={loading} text="Create Account" />
        </div>

      </form>

    </div>
  )
}

export default RegistrationForm
