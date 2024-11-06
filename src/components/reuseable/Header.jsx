import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import LogoPng from "../../assets/Book-Logo-1.png"

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const currentuser = useSelector((state) => state.auth.currentuser)

  const userNameFirstLetter = currentuser?.fullName.charAt(0)

  console.log("Is Authenticated", isAuthenticated)

  return (
    <div className="flex items-center justify-between bg-transparent fixed top-0 left-0 z-10 right-0 w-full px-4 md:px-12  py-4">
      <Link to="/" className="flex items-center justify-center gap-x-2">
        <img 
          src={LogoPng} 
          alt="site-logo"
          className="w-7 sm:w-8 h-auto"
        />
        <h1 className=" text-xl sm:text-2xl font-semibold font-[neuemachina]">Notebook</h1>
      </Link>

      <div className=" flex gap-x-8">
        <Link to="/" className="mt-1">Home</Link>

        {isAuthenticated
          ? <>
            <Link
              to="/user-dashboard"
              className="font-[neuemachina] w-8 h-8 flex items-center justify-center rounded-full text-black font-semibold text-lg bg-[#24CFA6]"
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
