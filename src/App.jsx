import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/reuseable/Header"
import LoginForm from "./components/pages/LoginForm.jsx"
import RegistrationForm from "./components/pages/RegistrationForm.jsx"
import ForgotPassword from "./components/pages/ForgotPassword.jsx"
import ResetPassword from "./components/pages/ResetPassword.jsx"
import Home from "./components/pages/Home"
import UserDashboard from "./components/pages/UserDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import NotebookDashboard from "./components/pages/NotebookDashboard.jsx"
import SectionAndNotesPage from "./components/pages/SectionAndNotesPage.jsx"
import Developer from "./components/pages/Developer.jsx"


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
        <Route path="/developer" element={<Developer />}/>
        
        <Route element={<ProtectedRoute />}>
          <Route path="/my-notebook" element={<NotebookDashboard />} />
          <Route path="/notebook/:notebookId" element={<SectionAndNotesPage/>}/>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
