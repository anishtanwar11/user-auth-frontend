import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/api";
import Notebook from "../reuseable/Notebook.jsx";
import FormModel from "../reuseable/FormModel.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getNotebooks } from "../../store/slices/notebookSlice.js";
import { toast } from "react-toastify";

const NotebookDashboard = () => {
    const dispatch = useDispatch();

    // Redux state for notebooks
    const notebookTitles = useSelector((state) => state.books.notebooks || []);

    const [createbook, setCreateBook] = useState(false); // state for create new notebook modal
    const [title, setTitle] = useState(""); // state for notebook title
    const [searchQuery, setSearchQuery] = useState(""); // state for search query
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [isReload, setIsReload] = useState(false);
    const [loading, setLoading] = useState(false) // State for loading animation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const options = {
            method: 'POST',
            url: API_ENDPOINTS.createNotebook,
            withCredentials: true,
            data: { title },
        };
        try {
            const response = await axios.request(options);

            // Dispatch the new notebook to the Redux store
            dispatch(getNotebooks([...notebookTitles, response.data.data]));
            setLoading(false)
            setCreateBook(false);
            setTitle("");
            toast.success(response.data.message)
        } catch (error) {
            setLoading(false)
            setMessageType("error");
            setMessage(error.response?.data?.message || "An error occurred.");
        }
    };

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
            } catch (error) {
                console.log(error.response?.data?.message || "An error occurred.");
            }
        };
        fetchData();
    }, [dispatch, isReload]);

    const closeCreateNotebook = (e) => {
        e.preventDefault();
        setCreateBook(false);
        setTitle("");
        setMessage(""); 
        setMessageType("");
    };

    return (
        <div className="flex justify-center items-start relative px-3">
            <div className="w-full max-w-5xl mt-24 flex flex-col">
                <div className="w-full flex flex-wrap gap-y-5 justify-between items-center mb-8">
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

                <div className="mb-4">
                    <h2 className="text-lg font-normal">
                        <p className="border-b-[3px] border-white w-max pb-[9px]">My Notebooks</p>
                    </h2>
                    <div className="w-full bg-[#1E1E1E]">
                        <button
                            onClick={() => setCreateBook(true)}
                            className="flex items-center text-sm py-1 pl-3 pr-12 text-gray-400 hover:text-white"
                        >
                            <i className="ri-add-fill text-xl"></i>&nbsp;&nbsp;New
                        </button>
                    </div>
                </div>

                {notebookTitles.length === 0 ? (
                    <div className="text-gray-400 text-center mt-10">
                        <p>No notebooks found. Start by creating your first notebook!</p>
                    </div>
                ) : (
                    <Notebook
                        searchQuery={searchQuery}
                        notebookTitles={notebookTitles}
                        setIsReload={setIsReload}
                    />
                )}
            </div>

            {createbook && (
                <FormModel
                    message={message}
                    messageType={messageType}
                    text="Create New Notebook"
                    text1="Cancel"
                    text2="Create"
                    onSubmit={handleSubmit}
                    label="Notebook Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onClick={closeCreateNotebook}
                    loading={loading}

                    createbook={createbook}
                />
            )}
        </div>
    );
};

export default NotebookDashboard;
