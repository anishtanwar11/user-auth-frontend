import { useSelector } from "react-redux"
import NotebookDashboard from "./NotebookDashboard"

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return (
    <>
    {!isAuthenticated 
      ?  <>
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            Home Works
          </div>
         </>
      : <NotebookDashboard />
    }
    </>
  )
}

export default Home
