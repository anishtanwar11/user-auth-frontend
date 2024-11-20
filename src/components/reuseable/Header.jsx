import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import LogoPng from "../../assets/Book-Logo-1.png"
import { useEffect, useState } from "react";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  console.log("Is Authenticated", isAuthenticated)

  const currentuser = useSelector((state) => state.auth.currentuser)

  const userNameFirstLetter = currentuser?.fullName.charAt(0)


  const [naveMenu, setNaveMenu] = useState(false)

  const naveMenuToggle = () => {
    setNaveMenu((feild) => !feild)
  }

  useEffect(() => {
  },[])

  return (
    <div className="bg-[#0d100c] flex items-center justify-between fixed z-10 top-0 left-0 right-0 w-full px-4 md:px-12  py-4">
      <Link to="/" className="flex items-center justify-center gap-x-2">
        <img
          src={LogoPng}
          alt="site-logo"
          className="w-7 sm:w-8 h-auto"
        />
        <h1 className=" text-xl sm:text-2xl font-semibold font-[neuemachina]">Notebook</h1>
      </Link>

      <div className=" flex gap-x-4 md:gap-x-6">
        <Link to="/" className="mt-1 hidden md:block">
          {isAuthenticated ? "My notebooks" : "Home"}
        </Link>

        <Link to="/developer" className="mt-1 hidden md:block" >Developer</Link>

        <div className="">
          <button onClick={naveMenuToggle} className="md:hidden text-xl">
            <i class="ri-menu-line"></i>
          </button>

          {naveMenu && (
            <div className="text-gray-200 text-base flex flex-col absolute top-0 left-0 right-0 w-full px-5 pt-20 pb-5 bg-black z-[-1] gap-y-2 shadow-lg">
              <Link to="/" className="mt-1 " onClick={naveMenuToggle}>
                {isAuthenticated 
                ? <><i className="ri-book-2-line text-xl mr-1"></i>My notebooks</> 
                : <><i className="ri-home-2-line text-xl mr-1"></i>Home</>
                }
              </Link>

              <Link to="/developer" className="mt-1" onClick={naveMenuToggle}>
                <i className="ri-file-user-line text-xl mr-1"></i>Developer</Link>
            </div>
          )}

        </div>

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
