import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/reuseable/Header"
import LoginForm from "./components/pages/LoginForm.jsx"
import RegistrationForm from "./components/pages/RegistrationForm.jsx"
import ForgotPassword from "./components/pages/ForgotPassword.jsx"
import ResetPassword from "./components/pages/ResetPassword.jsx"
import Home from "./components/pages/Home"
import UserDashboard from "./components/pages/UserDashboard"
import ProtectedRoute from "./components/ProtectedRoute"


const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password/:resetToken" element={<ResetPassword />}/>
        
        <Route element={<ProtectedRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
