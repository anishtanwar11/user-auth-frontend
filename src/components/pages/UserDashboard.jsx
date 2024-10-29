import { useSelector } from "react-redux";
const UserDashboard = () => {
  const user = useSelector((state) => state.auth)

  console.log("User-----",user)
  return (
    <div className="w-screen h-screen flex items-center justify-center">
    <div className="w-full max-w-[500px] flex justify-center  flex-col bg-[#121212] px-5 py-8 rounded-xlrounded-lg p-5">
      <h1>Profile</h1>
      <div>
        <h1>{user.currentuser.fullName}</h1>
        <h1>{user.currentuser.email}</h1>
      </div>
    </div>
    </div>
  )
}

export default UserDashboard
