import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../utils/api";
import FormModel from "./FormModel";
import DeleteWarning from "./DeleteWarning.jsx";
import { getNotebooks } from "../../store/slices/notebookSlice.js";
import { useDispatch } from "react-redux";


// eslint-disable-next-line react/prop-types
const Notebook = ({ searchQuery, notebookTitles, setIsReload }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateNotebookTitleModel, setUpdateNotebookTitleModel] = useState(false);
  const [title, setTitle] = useState(""); // state for notebook title
  const [notebookId, setNotebookId] = useState("")
  const [deleteNotebookModel, setDeleteNotebookModel] = useState(false); // For controlling delete notebook modal
  const [loading, setLoading] = useState(false) // State for loading animation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.patch(`${API_ENDPOINTS.notebook}/${notebookId}/update`, { title }, { withCredentials: true });
      setUpdateNotebookTitleModel(false);
      setIsReload((field) => !field)
      toast.success(response.data.message)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  const notebook = (notebookID, notebookTitle) => {
    console.log("NoteBook ID-", notebookId)
    setNotebookId(notebookID)
    setTitle(notebookTitle)
    setUpdateNotebookTitleModel(true)
  }


  const closeUpdateTitleModel = (e) => {
    e.preventDefault();
    setUpdateNotebookTitleModel(false)
  }

  const handleDeleteNotebook = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.delete(`${API_ENDPOINTS.notebook}/${notebookId}/delete`, { withCredentials: true });
      // Filter the deleted notebook from the Redux store
      const updatedNotebooks = notebookTitles.filter((notebook) => notebook._id !== notebookId);
      console.log("Updated Notebook:-", updatedNotebooks)

      dispatch(getNotebooks(updatedNotebooks)); // Update Redux state
      setLoading(false)
      setDeleteNotebookModel(false)
      // setIsReload((field) => !field)
      toast.success(response.data.message)
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message)
    }
  }

  const deleteNotebook = (notebookID) => {
    console.log("NoteBook ID-", notebookId)
    setNotebookId(notebookID)
    setDeleteNotebookModel(true)
  }

  // Filtered notebooks based on search query
  // eslint-disable-next-line react/prop-types
  const filteredNotebooks = notebookTitles.filter((notebook) =>
    // eslint-disable-next-line react/prop-types
    notebook.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filteredNotebooks.map((elem) => (
        <ul
          key={elem._id}
          className="cursor-pointer flex items-center mb-1 text-gray-300 justify-between group hover:bg-[#1e1e1e] p-2 duration-200 rounded"
        >
          <div
            onClick={() => navigate(`/notebook/${elem._id}`)}
            className="flex items-center justify-center  hover:text-white">
            <i className="ri-book-2-fill text-xl mr-1"></i>
            <li className="text-lg font-normal">{elem.title}</li>
          </div>

          <div className="opacity-0 group-hover:opacity-100 duration-200">
            <i
              onClick={() => notebook(elem._id, elem.title)}
              className="ri-pencil-fill mr-4 cursor-pointer hover:text-white">
            </i>
            <i
              onClick={() => deleteNotebook(elem._id)}
              className="ri-delete-bin-fill cursor-pointer hover:text-white">
            </i>
          </div>
        </ul>
      ))}


      {updateNotebookTitleModel && (
        <FormModel
          text="Rename Notebook"
          text1="Cancle"
          text2="Update"
          onSubmit={handleSubmit}
          onClick={closeUpdateTitleModel}
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          loading={loading}

          updateNotebookTitleModel={updateNotebookTitleModel}
        />
      )}

      {deleteNotebookModel && (
        <DeleteWarning
          h1="Permanently Delete Notebook"
          p="Deleting a notebook can't be undone. Do you want to permanently delete this notebook and all of its sections, and pages?"
          text1="Permanently Delete"
          text2="Cancle"
          onClickDelete={handleDeleteNotebook}
          onClickCancle={() => setDeleteNotebookModel(false)}
          loading={loading}
        />
      )}

    </div>
  );
};

export default Notebook;
