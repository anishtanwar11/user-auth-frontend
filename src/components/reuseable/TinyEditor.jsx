
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { API_ENDPOINTS } from "../../utils/api";

// eslint-disable-next-line react/prop-types
const TinyEditor = ({ initialValue, pageID, pageTitle, setIsReload}) => {
  const apiKey = import.meta.env.VITE_TINY_EDITOR_API_KEY;
  const [content, setContent] = useState('');


  console.log("Page ID in editor-", pageID)
  const handleEditorChange = (newContent) => {
    console.log("new-", newContent)
    setContent(newContent)
  };

  const saveNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_ENDPOINTS.pages}/page/${pageID}`, { content, pageTitle }, { withCredentials: true });
      console.log("response content editor-", response)
      console.log("Page Title-", pageTitle)
      toast.success(response.data.message || "Page Updated")
    } catch (error) {
      console.log(error.response?.data.message)
    }
  }

  const deletePage = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.delete(`${API_ENDPOINTS.pages}/page/${pageID}/delete`, { withCredentials: true });
      toast.success(response.data.message)
      setIsReload((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="relative">
      <Editor
        apiKey={apiKey}
        initialValue={initialValue}
        value={content}
        init={{
          height: 510,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={handleEditorChange}
      />

      <div className="flex items-center justify-end absolute top-[-10.5%] right-0 gap-x-2">
        <button
          onClick={deletePage}
          className="text-sm font-medium text-white hover:bg-[#454545] px-4 py-1 rounded flex items-center justify-center gap-x-1">
          <i className="ri-delete-bin-fill"></i>
        </button>
        <button
          onClick={saveNote}
          className="text-sm font-medium text-black bg-[#24CFA6] px-4 py-1 rounded flex items-center justify-center gap-x-1"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default TinyEditor
