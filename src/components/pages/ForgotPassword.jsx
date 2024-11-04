import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/api";
import InputField from "../reuseable/InputField.jsx"
import SubmitButton from "../reuseable/SubmitButton.jsx";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(API_ENDPOINTS.forgotPassword, { email })

            setLoading(false)
            setMessageType('success')
            setMessage(response.data.message || "Reset email sended to your email")
            setEmail("")
        } catch (error) {
            setLoading(false)
            setMessageType('error')
            setMessage(error.response.data.message || "An error occured during login user!!")
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col">
            <form onSubmit={handleSubmit} className=" flex  flex-col font-[helvetica1] gap-y-4 w-full max-w-[450px]">
                <div>
                    <h1 className="text-[2rem] font-medium mb-2">Forgot Password</h1>
                    <p className="text-sm text-gray-400 font-normal">
                        Lost your <span className="text-[#24CFA6]">password?</span> No worries! Follow these simple steps. Enter your registered email and we will send you a <span className="text-[#24CFA6]">reset link</span> to reset your password.
                    </p>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        placeholder="Registered Email"
                    />

                    <SubmitButton loading={loading} text="Continue"/>
                </div>
            </form>

            <div className="border-t-[1px] border-gray-500 w-full max-w-[450px] text-center py-4 mt-4 relative">
                <div className="absolute top-[-13px] left-[47%] bg-[#0d100c] p-1 text-xs text-gray-400">Or</div>

                <p className=" text-gray-600 text-sm font-medium">Don&apos;t have an account? <Link to="/signup" className="text-blue-500"><u> Create account </u></Link></p>

            </div>
        </div>
    )
}

export default ForgotPassword
