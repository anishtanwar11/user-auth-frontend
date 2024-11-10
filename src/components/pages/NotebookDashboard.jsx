import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/api";
import InputField from "../reuseable/InputField";
import Notebook from "../reuseable/Notebook.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getNotebooks } from "../../store/slices/notebookSlice.js";

const NotebookDashboard = () => {
    const dispatch = useDispatch();
    
    // Redux state for notebooks
    const notebookTitles = useSelector((state) => state.books.notebooks || []);

    const [createbook, setCreateBook] = useState(false); // state for create new notebook modal
    const [title, setTitle] = useState(""); // state for notebook title
    const [searchQuery, setSearchQuery] = useState(""); // state for search query
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            url: API_ENDPOINTS.createNotebook,
            withCredentials: true,
            data: { title },
        };
        try {
            const response = await axios.request(options);
            console.log(response.data.message);

            // Dispatch the new notebook to the Redux store
            dispatch(getNotebooks([...notebookTitles, response.data.data]));
            setCreateBook(false);
            setTitle("");
            setMessageType("success");
            setMessage("Notebook created successfully!");
        } catch (error) {
            setMessageType("error");
            setMessage(error.response?.data?.message || "An error occurred.");
        }
    };

    // Fetch all notebooks on component load
    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: API_ENDPOINTS.allNotebooks,
                withCredentials: true,
            };
            try {
                const response = await axios.request(options);
                const data = response.data.data;
                dispatch(getNotebooks(data));
                console.log("Fetched Notebooks:", data);
            } catch (error) {
                console.log("Error fetching notebooks:", error);
            }
        };
        fetchData();
    }, [dispatch]);

    const closeCreateNotebook = (e) => {
        e.preventDefault();
        setCreateBook(false);
        setTitle("");
        setMessageType("");
    };

    return (
        <div className="flex justify-center items-center relative px-3">
            <div className="w-full max-w-5xl mt-24 flex flex-col gap-y-8">
                <div className="w-full flex flex-wrap gap-y-5 justify-between items-center">
                    <h1 className="text-3xl sm:text-4xl font-medium font-[neuemachina] text-gray-300">Notebooks</h1>
                    <div className="w-full sm:w-min flex justify-between border-[1px] border-gray-200 px-2 py-1">
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-max border-[1px] outline-none border-none bg-transparent placeholder:text-sm"
                            type="search"
                            placeholder="Search my notebooks"
                        />
                        <i className="ri-search-line"></i>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-normal">
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

                <Notebook searchQuery={searchQuery} notebookTitles={notebookTitles} />
            </div>

            {createbook && (
                <div className="px-4 w-screen h-screen absolute top-0 left-0 right-0 bg-black/40 flex items-center justify-center">
                    <form onSubmit={handleSubmit} className="bg-black p-8 w-full max-w-md">
                        <h1 className="text-xl text-gray-300 font-medium">Create New Notebook</h1>
                        <InputField
                            label="Notebook Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {message && (
                            <p className={`text-xs mt-2 ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                {message}
                            </p>
                        )}

                        <div className="w-full flex items-center justify-end gap-x-4 mt-4">
                            <button onClick={closeCreateNotebook} className="bg-white text-black px-3 py-1 rounded-sm text-sm">Cancel</button>
                            <button type="submit" className="bg-[#24CFA6] text-black px-3 py-1 rounded-sm text-sm">Create</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default NotebookDashboard;
