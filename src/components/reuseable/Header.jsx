import { Link } from "react-router-dom"
import { useSelector } from "react-redux";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const currentuser = useSelector((state) => state.auth.currentuser)

  const userNameFirstLetter = currentuser?.fullName.charAt(0)

  console.log("Is Authenticated", isAuthenticated)

  return (
    <div className="flex justify-between bg-transparent fixed top-0 left-0 z-10 right-0 w-full px-12 py-4">
      <div>
        <h1 className=" text-2xl font-semibold">Notebook</h1>
      </div>

      <div className=" flex gap-x-8">
        <Link to="/" className="mt-1">Home</Link>

        {isAuthenticated
          ? <>
            <Link
              to="/user-dashboard"
              className="w-8 h-8 flex items-center justify-center rounded-full text-black font-medium text-[1.25rem] bg-[#24CFA6]"
            >
              {userNameFirstLetter}
            </Link>
          </>
          : <Link to="/signin" className="bg-[#24CFA6] text-black font-medium text-base rounded-sm px-4 py-1">Sign In</Link>
        }

      </div>

    </div>
  )
}

export default Header
