import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_ENDPOINTS } from "../../utils/api";
import InputField from "../reuseable/InputField";
import TinyEditor from "../reuseable/TinyEditor.jsx"

const SectionAndNotesPage = () => {
  const { notebookId } = useParams();
  const notebookTitle = useSelector((state) => state.books.notebooks);
  const currantNotebook = notebookTitle.find((elem) => elem._id === notebookId);

  // States for handling section and page data
  const [title, setTitle] = useState(""); // For new section title
  const [createBookModal, setCreateBookModal] = useState(false); // For controlling new section modal
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [sectionTitles, setSectionTitles] = useState([]);
  const [pages, setPages] = useState([]);
  const [sectionID, setSectionID] = useState(""); // Current section ID
  const [pageID, setPageID] = useState(""); // Current page ID
  const [pageTitle, setPageTitle] = useState("");
  const [isReload, setIsReload] = useState(false); // State for verify if page is reload or not

  const [sectionMenu, setSectionMenu] = useState(false);

  // Get the current page data based on the selected page ID
  const currentPage = pages.find((page) => page._id === pageID) || {};

  // Update pageTitle when pageID changes
  useEffect(() => {
    const selectedPage = pages.find((page) => page._id === pageID);
    setPageTitle(selectedPage?.title || "");
  }, [pageID, pages]);

  // Handle changing the selected page and setting the title
  const pageTitleChange = (pageId) => {
    setPageID(pageId);
    const selectedPage = pages.find((page) => page._id === pageId);
    setPageTitle(selectedPage?.title || "");
  };

  // Update the page title in real-time in the pages array
  const handlePageTitleChange = (e) => {
    const updatedTitle = e.target.value;
    setPageTitle(updatedTitle);

    setPages((prevPages) =>
      prevPages.map((page) =>
        page._id === pageID ? { ...page, title: updatedTitle } : page
      )
    );
  };

  // Fetch sections for the selected notebook
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.allSections}/${notebookId}/section`, {
          withCredentials: true,
        });
        setSectionTitles(response.data.data);

        // Default to the first section if it exists
        if (response.data.data.length > 0) {
          setSectionID(response.data.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching sections:", error.response?.data?.message || error.message);
      }
    };
    fetchSections();
  }, [notebookId]);

  // Fetch pages for the selected section
  useEffect(() => {
    const fetchPages = async () => {
      if (!sectionID) return; // Exit if no sectionID is selected

      try {
        const response = await axios.get(`${API_ENDPOINTS.pages}/${sectionID}/pages`, {
          withCredentials: true,
        });
        setPages(response.data.data);

        // Default to the first page if it exists
        if (response.data.data.length > 0) {
          setPageID(response.data.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching pages:", error.response?.data?.message || error.message);
      }
    };
    fetchPages();
  }, [sectionID, isReload]);

  // Handle creating a new section
  const handleCreateSection = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.createSection}/${notebookId}/section/create`,
        { title },
        { withCredentials: true }
      );
      setSectionTitles((prev) => [...prev, response.data.data]);
      setCreateBookModal(false);
      setMessageType("success");
      setTitle("");
    } catch (error) {
      setMessageType("error");
      setMessage(error.response?.data?.message || error.message);
    }
  };

  // Handle creating a new page
  const handleCreatePage = async () => {
    try {
      const response = await axios.post(`${API_ENDPOINTS.pages}/${sectionID}/pages/create`, {}, { withCredentials: true });
      setPages((prevPages) => [...prevPages, response.data.data]); // Append new page to pages array
    } catch (error) {
      console.error("Error creating new page:", error.response?.data?.message || error.message);
    }
  };

  // Close the create section modal
  const closeCreateSectionModal = (e) => {
    e.preventDefault();
    setMessageType(null);
    setCreateBookModal(false);
    setTitle("");

  };

  // Define your color palette
  const colors = ["#dc2626", "#84cc16", "#06b6d4", "#f59e0b", "#c026d3", "#e11d48", "#a3a3a3"];

  return (
    <div className="flex justify-center items-center relative px-6">
      <div className="w-full mt-24 flex flex-row gap-y-8">
        {/* Sidebar with Sections and Pages */}
        <div className="w-1/4">
          <h2 className="relative flex items-center text-lg font-normal border-t-[1px] border-l-[1px] border-gray-700 p-2">
            <i className="ri-book-2-fill text-xl mr-2 text-gray-300"></i>
            <p className="w-max mr-2">{currantNotebook?.title}</p>
          </h2>
          <div className="flex flex-row h-[92.5%] w-full ">
            {/* Section Container */}
            <div className="w-full flex flex-col items-center border-[1px] border-gray-700">
              <button
                onClick={() => setCreateBookModal(true)}
                className="bg-[#1E1E1E] w-full flex items-center text-sm text-gray-400 p-2"
              >
                <i className="ri-add-fill text-xl"></i>&nbsp;&nbsp;Add Section
              </button>
              <div className="w-full">
                {sectionTitles.map((section, index) => (
                  <ul
                    onClick={() => setSectionID(section._id)}
                    key={section._id}
                    className="p-2 cursor-pointer flex items-center justify-between hover:bg-[#1E1E1E] h-12 text-gray-300 relative group" // Added `relative` and `group` classes
                  >
                    <div className="flex items-center">
                      <div
                        className="w-1 h-6 rounded-lg mr-2"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      <li className="text-base font-normal">{section.title}</li>
                    </div>

                    {/* Button initially hidden, visible on hover */}
                    <div>
                      <button onClick={() => setSectionMenu(true)} className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <i className="ri-more-2-line"></i>
                      </button>
                      {/* {(sectionMenu) && 
                       <ul className="absolute bg-black">
                          <li className="p-4">Rename</li>
                          <li className="p-4">Delete</li>
                        </ul>
                      } */}
                    </div>
                  </ul>
                ))}
              </div>

            </div>

            {/* Pages Container */}
            <div className="w-full flex flex-col items-center border-t-[1px] border-b-[1px] border-gray-700">
              <button
                onClick={handleCreatePage}
                className="bg-[#1E1E1E] w-full flex items-center text-sm text-gray-400 p-2"
              >
                <i className="ri-add-fill text-xl"></i>&nbsp;&nbsp;Add Page
              </button>
              <div className="w-full">
                {pages.map((page) => (
                  <ul
                    onClick={() => pageTitleChange(page._id)}
                    key={page._id}
                    className="p-2 cursor-pointer flex items-center hover:bg-[#1E1E1E] h-12 text-gray-300"
                  >
                    <li className="text-base font-normal">{page.title}</li>

                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Editor Section */}
        <div className="border-[1px] border-gray-700 w-full">
          <div className="py-2 px-4 border-b-[1px] border-gray-700 flex items-center justify-between w-full">
            <div className="flex items-end">
              <input
                value={pageTitle}
                onChange={handlePageTitleChange} // Update page title in real time
                type="text"
                className="text-xl bg-transparent text-white outline-none border-b-[1px] border-gray-700"
              />
              <p className=" text-sm text-gray-500">
                {currentPage?.updatedAt
                  ? new Date(currentPage.updatedAt).toLocaleString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                  : "No update date available"
                }
              </p>
            </div>
          </div>
          <div className="p-4 ">
            <TinyEditor initialValue={currentPage?.content} pageID={pageID} pageTitle={pageTitle} setIsReload={setIsReload} />
          </div>
        </div>
      </div>

      {/* Create Section Modal */}
      {createBookModal && (
        <div className="px-4 w-screen h-screen absolute top-0 left-0 right-0 bg-black/40 flex items-center justify-center">
          <form onSubmit={handleCreateSection} className="bg-black p-8 w-full max-w-md">
            <h1 className="text-xl text-gray-300 font-medium">Create New Section</h1>
            <InputField
              label="Title"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {(message !== null) && (
              <p className={`text-xs mt-2 ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </p>
            )}
            <div className="w-full flex items-center justify-end gap-x-4 mt-4">
              <button onClick={closeCreateSectionModal} className="bg-white text-black px-3 py-1 rounded-sm text-sm">Cancel</button>
              <button type="submit" className="bg-[#24CFA6] text-black px-3 py-1 rounded-sm text-sm">Create</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SectionAndNotesPage;
