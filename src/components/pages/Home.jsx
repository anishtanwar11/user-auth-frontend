import { useSelector } from "react-redux"
import NotebookDashboard from "./NotebookDashboard"
import { Link } from "react-router-dom"

import Hero1 from "../../assets/hero/Hero-Img-1.jpg";
import Hero2 from "../../assets/hero/hero-img-2.jpg";


const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return (
    <>
      {!isAuthenticated
        ? <>
          <div className="flex flex-col justify-center items-center font-[helvetica1]">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full mt-24 lg:mt-44 gap-y-8 lg:gap-x-8">

              <div className="flex w-full lg:w-1/3 px-5 md:px-0 mx-auto items-center justify-center">
                <div className="flex flex-col gap-y-6">
                  <div className="flex flex-col gap-y-2">
                    <h1 className="text-[#24CFA6] text-3xl font-[neuemachina] font-semibold">Notebook</h1>
                    <h2 className="text-xl font-normal ">Your digital notebook</h2>
                    <p className="text-sm text-gray-300 font-normal">One cross-functional notebook for all your note taking needs.</p>
                  </div>
                  <div className="flex flex-row gap-x-5">
                    <Link
                      to="/signup"
                      className="bg-[#24CFA6] border-2 border-[#24CFA6] text-black px-6 py-1 text-base">Sign up for free
                    </Link>
                    <Link
                      to="/signin"
                      className="bg-black hover:bg-gray-800 border-2 border-[#24CFA6] text-[#24CFA6] px-6 py-1 text-base">Sign in
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-5xl pl-10">
                <img src={Hero1} alt="" className="" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between w-full mt-24 lg:mt-44 gap-y-8 lg:gap-x-8">

              <div className="w-full max-w-5xl px-5">
                <img src={Hero2} alt="" className="" />
              </div>

              <div className="flex w-full lg:pr-10 px-5 mx-auto items-center justify-center">
                <div className="flex flex-col gap-y-6">
                  <div className="flex flex-col gap-y-2">
                    <h1 className="text-white text-xl md:text-3xl font-[neuemachina] font-semibold">Notebook in Education</h1>
                    <p className="md:text-xl font-normal text-gray-300">Teachers can use Notebook to organize lesson plans in searchable digital notebooks, and staff can create a content library. Encourage students to handwrite notes and sketch diagrams.</p>
                  </div>
                </div>
              </div>

            </div>

            <div className=" flex items-center justify-center w-full mt-20 mb-16">
              <h1 className="text-center text-2xl sm:text-5xl font-[neuemachina] font-bold">Design & Developed by <br/><span className="text-[#24CFA6]"> Anish Tanwar</span></h1>
            </div>
          </div>
        </>
        : <NotebookDashboard />
      }
    </>
  )
}

export default Home
