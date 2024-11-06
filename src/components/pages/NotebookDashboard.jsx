import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/api";
import InputField from "../reuseable/InputField";
import { useNavigate } from "react-router-dom";

const NotebookDashboard = () => {
    const navigate = useNavigate()
    const [createbook, setCreateBook] = useState(false) // state for create new notebook
    const [title, setTitle] = useState("")
    const [notebookTitles, setNotebookTitles] = useState([])
    const [searchQuery, setSearchQuery] = useState(""); // state for search query

    const handleSubmit = async (e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            url: API_ENDPOINTS.create,
            withCredentials: true,
            data: { title },
        }
        try {
            const response = await axios.request(options)
            console.log(response.data.message)

            // Refresh notebook list after creation
            setNotebookTitles([...notebookTitles, response.data.data]);
            setCreateBook(false)
            setTitle("")
        } catch (error) {
            console.log(error.response.data.message)
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: API_ENDPOINTS.all,
                withCredentials: true,  // Include credentials (cookies) in the request
            };
            try {
                const response = await axios.request(options)
                setNotebookTitles(response.data.data)
                console.log("Response-", response)
            } catch (error) {
                console.log("Error Appear", error)
            }
        }
        fetchData()
    }, [title])

    const closeCreateNotebook = (e) => {
        e.preventDefault();
        setCreateBook(false)
        setTitle("")
    }

    // Filtered notebooks based on search query
    const filteredNotebooks = notebookTitles.filter((notebook) => 
        notebook.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className=" flex justify-center items-center relative px-3">
            <div className="w-full max-w-5xl mt-24 flex flex-col gap-y-8">
                <div className="w-full flex flex-wrap gap-y-5 justify-between items-center">
                    <h1 className="text-3xl sm:text-4xl font-medium font-[neuemachina] text-gray-300">NoteBooks</h1>
                    <div className="w-full sm:w-min flex justify-between border-[1px] border-gray-200 px-2 py-1">
                        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full sm:w-max border-[1px] outline-none border-none bg-transparent placeholder:text-sm " type="search" placeholder="Search my notebooks" />
                        <i className="ri-search-line"></i>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-normal ">
                        <p className="border-b-[3px] border-white w-max pb-[9px]">My Notebooks</p>
                    </h2>
                    <div className="w-full bg-[#1E1E1E]">
                        <button
                            onClick={() => setCreateBook(true)}
                            className="flex items-center text-sm py-1 pl-3 pr-12 text-gray-400"
                        >
                            <i className="ri-add-fill text-xl"></i>&nbsp;&nbsp;New
                        </button>
                    </div>
                </div>

                <div className="">
                    {filteredNotebooks.map((elem) => (
                        <ul key={elem._id} onClick={() => navigate(`/notebook/${elem._id}`)} className="cursor-pointer flex items-center mb-4 text-gray-300">
                            <i className="ri-book-2-fill text-xl mr-2"></i>
                            <li className="text-lg font-normal ">{elem.title}</li>
                        </ul>
                    ))}
                </div>
            </div>

            {createbook && (
                <div className="px-4 w-screen h-screen absolute top-0 left-0 right-0 bg-black/40 flex items-center justify-center ">
                    <form onSubmit={handleSubmit} className="bg-black p-8 w-full max-w-md">
                        <h1 className="text-xl text-gray-300 font-medium">Create New Notebook</h1>
                        <InputField
                            label="Notebook Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <div className="w-full flex items-center justify-end gap-x-4 mt-4">
                            <button onClick={closeCreateNotebook} className="bg-white text-black px-3 py-1 rounded-sm text-sm">Cancle</button>
                            <button type="submit" className="bg-[#24CFA6] text-black px-3 py-1 rounded-sm text-sm">Create</button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    )
}

export default NotebookDashboard
