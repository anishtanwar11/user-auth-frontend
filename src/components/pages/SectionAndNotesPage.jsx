import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_ENDPOINTS } from "../../utils/api";
import TinyEditor from "../reuseable/TinyEditor.jsx"
import FormModel from "../reuseable/FormModel.jsx";
import DeleteWarning from "../reuseable/DeleteWarning.jsx";
import { toast } from "react-toastify";
import Portal from "../reuseable/Portal.jsx";

const SectionAndNotesPage = () => {
  const { notebookId } = useParams();
  const notebookTitle = useSelector((state) => state.books.notebooks);
  const currantNotebook = notebookTitle.find((elem) => elem._id === notebookId);

  // States for handling section and page data
  const [title, setTitle] = useState(""); // For new section title
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);

  const [sections, setSections] = useState([]);
  const [sectionID, setSectionID] = useState(""); // Current section ID
  const [sectionTitles, setSectionTitles] = useState("");

  const [pages, setPages] = useState([]);
  const [pageID, setPageID] = useState(""); // Current page ID
  const [pageTitle, setPageTitle] = useState("");

  const [isReload, setIsReload] = useState(false); // State for verify if page is reload or not

  const [createBookModal, setCreateBookModal] = useState(false); // For controlling new section modal
  const [updateTitleModel, setUpdateTitleModel] = useState(false); // For controlling update section modal
  const [deleteSectionModel, setDeleteSectionModel] = useState(false); // For controlling delete section modal


  const [sectionMenu, setSectionMenu] = useState(null); // Track open menu by section ID
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const [loading, setLoading] = useState(false) // State for loading animation

  // Get the current page data based on the selected page ID
  const currentPage = pages.find((page) => page._id === pageID) || {};

  // Update pageTitle when pageID changes
  useEffect(() => {
    // For page title
    const selectedPage = pages.find((page) => page._id === pageID);
    setPageTitle(selectedPage?.title || "");

    // For section title
    const selectedSection = pages.find((section) => section._id === sectionID);
    setSectionTitles(selectedSection?.title || "");
  }, [pageID, pages, sectionID]);

  // Handle changing the selected page and setting the title
  const pageTitleChange = (pageId) => {
    setPageID(pageId);
    const selectedPage = pages.find((page) => page._id === pageId);
    setPageTitle(selectedPage?.title || "");
  };

  // Update the page title in real-time in the pages array
  const handlePageTitleChange = (e) => {
    const updatedTitle = e.target.value;
    if (updatedTitle.length > 25) {
      toast.error("Page title should be less than or equlas to 20 words");
      return;
    }
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
        setSections(response.data.data);

        // Default to the first section if it exists
        if (response.data.data.length > 0) {
          setSectionID(response.data.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching sections:", error.response?.data?.message || error.message);
      }
    };
    fetchSections();
  }, [notebookId, isReload]);

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
    setLoading(true)
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.createSection}/${notebookId}/section/create`,
        { title },
        { withCredentials: true }
      );
      setLoading(false)
      setSections((prev) => [...prev, response.data.data]);
      setCreateBookModal(false);
      setTitle("");
      toast.success(response.data.message)
    } catch (error) {
      setLoading(false)
      setMessageType("error");
      setMessage(error.response?.data?.message || error.message || "An unexpected error occurred.");
    }
  };

  // Handle creating a new page
  const handleCreatePage = async () => {
    try {
      const response = await axios.post(`${API_ENDPOINTS.pages}/${sectionID}/pages/create`, {}, { withCredentials: true });
      setPages((prevPages) => [...prevPages, response.data.data]); // Append new page to pages array
    } catch (error) {
      console.error("Error creating new page:", error.response?.data?.message || error.message || "An unexpected error occurred.");
    }
  };

  // Close the create section modal
  const closeCreateSectionModal = (e) => {
    e.preventDefault();
    setMessageType(null);
    setCreateBookModal(false);
    setTitle("");
    setMessage("")
  };

  // Define your color palette
  const colors = ["#dc2626", "#84cc16", "#06b6d4", "#f59e0b", "#c026d3", "#e11d48", "#a3a3a3"];

  const handleUpdateSectionTitle = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.patch(`${API_ENDPOINTS.sections}/${sectionID}/update`, { title }, { withCredentials: true });
      setLoading(false)
      setUpdateTitleModel(false)
      setIsReload((feild) => !feild)
      toast.success(response.data.message)
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message || "An unexpected error occurred.")
    }
  }

  const updateSectionTitle = (sectionId, sectionTitle) => {
    setUpdateTitleModel(true)
    setSectionID(sectionId)
    setTitle(sectionTitle);
  }

  const handleDeleteSection = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.delete(`${API_ENDPOINTS.sections}/${sectionID}/delete`, { withCredentials: true });
      setLoading(false)
      setDeleteSectionModel(false)
      setIsReload((feild) => !feild)
      toast.success(response.data.message)
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message || "An unexpected error occurred.")
    }
  }

  const deleteSection = (sectionId) => {
    setSectionID(sectionId)
    setDeleteSectionModel(true)
  }

  // The menu is close when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setSectionMenu(null); // Close any open menus
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuPosition = (e) => {
    const { clientX, clientY } = e;
    const menuHeight = 120; // Approximate height of the menu (adjust if necessary)
    const menuWidth = 180; // Approximate width of the menu (adjust if necessary)
    const buffer = 15; // Padding from screen edges

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let top = clientY;
    let left = clientX;

    // Check if the menu overflows the bottom of the viewport
    if (clientY + menuHeight > viewportHeight) {
      top = viewportHeight - menuHeight - buffer;
    }

    // Check if the menu overflows the right side of the viewport
    if (clientX + menuWidth > viewportWidth) {
      left = viewportWidth - menuWidth - buffer;
    }

    // Ensure it doesn't overflow at the top or left edges
    top = Math.max(buffer, top);
    left = Math.max(buffer, left);

    setMenuPosition({ top, left });
  };

  const [sectionPageMenu, setSectionPageMenu] = useState(false);
  const sectionAndPageMenuForSmallScreen = () => {
    setSectionPageMenu((feild) => !feild)
  }

  return (
    <div className="flex justify-center items-start relative  md:px-6 h-screen overflow-hidden">
      <div className="w-full mt-20 md:mt-24 flex flex-row gap-y-8">
        {/* Sidebar with Sections and Pages */}
        <div className="w-[340px] hidden md:block">
          <h2 className="relative flex items-center text-lg font-normal border-t-[1px] border-l-[1px] border-gray-700 p-2">
            <i className="ri-book-2-fill text-xl mr-2 text-gray-300"></i>
            <p className="w-max mr-2">{currantNotebook?.title}</p>
          </h2>
          <div className="flex flex-row h-[77%] w-full ">
            {/* Section Container */}
            <div className="w-[170px] flex flex-col items-center border-[1px] border-gray-700 relative">
              <button
                onClick={() => setCreateBookModal(true)}
                className="bg-[#1E1E1E] w-full flex items-center text-sm text-gray-400 p-2"
              >
                <i className="ri-add-fill text-xl"></i>&nbsp;&nbsp;Add section
              </button>
              <div id="section-y-scroll" className="w-full h-[600px] overflow-x-visible overflow-y-auto">
                {sections.map((section, index) => (
                  <ul
                    onClick={() => setSectionID(section._id)}
                    key={section._id}
                    className="p-2 w-full cursor-pointer flex items-center justify-between hover:bg-[#1E1E1E] h-12 text-gray-300 relative group" // Added `relative` and `group` classes
                  >
                    <div className="flex items-center">
                      <div
                        className="w-1 h-6 rounded-lg mr-2"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      <li className=" text-sm font-normal truncate w-[120px]">{section.title}</li>
                    </div>

                    {/* Button initially hidden, visible on hover */}
                    <div className="">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSectionMenu(section._id)
                          handleMenuPosition(e);
                        }}
                        className=" rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <i className="ri-more-2-line"></i>
                      </button>
                      {(sectionMenu === section._id) &&
                        <Portal>
                          <ul
                            onClick={(e) => e.stopPropagation()}
                            className="w-44 bg-black shadow-lg"
                            style={{ position: 'fixed', top: menuPosition.top, left: menuPosition.left }}
                          >
                            <li
                              onClick={() => updateSectionTitle(section._id, section.title)}
                              className="menu-item"
                            >
                              <i className="ri-pencil-line mr-1"></i> Rename Section
                            </li>
                            <li
                              onClick={() => deleteSection(section._id)}
                              className="menu-item">
                              <i className="ri-close-large-line mr-1"></i> Delete Section
                            </li>
                            <li onClick={() => setCreateBookModal(true)} className="menu-item">
                              <i className="ri-add-large-line mr-1"></i> New Section
                            </li>
                          </ul>
                        </Portal>
                      }
                    </div>
                  </ul>
                ))}
              </div>

            </div>

            {/* Pages Container */}
            <div className="w-[170px] flex flex-col items-center border-t-[1px] border-b-[1px] border-gray-700">
              <button
                onClick={handleCreatePage}
                className="bg-[#1E1E1E] w-full flex items-center text-sm text-gray-400 p-2"
              >
                <i className="ri-add-fill text-xl"></i>&nbsp;&nbsp;Add page
              </button>
              <div id="section-y-scroll" className="w-full h-[600px] overflow-y-scroll ">
                {pages.map((page) => (
                  <ul
                    onClick={() => pageTitleChange(page._id)}
                    key={page._id}
                    className="py-2 cursor-pointer flex items-center hover:bg-[#1E1E1E] h-12 w-full text-gray-300"
                  >
                    <li className="px-2 text-sm font-normal truncate w-full ">{page.title}</li>

                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>

        {sectionPageMenu && (
        <div className="w-full h-screen top-0 md:hidden absolute bg-black z-[10]">
          <h2 className="relative flex items-center text-lg font-normal border-t-[1px] border-l-[1px] border-gray-700 p-2">
            <i className="ri-book-2-fill text-xl mr-2 text-gray-300"></i>
            <p className="w-max mr-2">{currantNotebook?.title}</p>
          </h2>
          <div className="flex flex-row h-full w-full ">
            {/* Section Container */}
            <div className="w-1/2 flex flex-col items-center border-[1px] border-gray-700 relative">
              <button
                onClick={() => setCreateBookModal(true)}
                className="bg-[#1E1E1E] w-full flex items-center text-sm text-gray-400 p-2"
              >
                <i className="ri-add-fill text-xl"></i>&nbsp;&nbsp;Add section
              </button>
              <div id="section-y-scroll" className="w-full h-[600px] overflow-x-visible overflow-y-auto">
                {sections.map((section, index) => (
                  <ul
                    onClick={() => setSectionID(section._id)}
                    key={section._id}
                    className="p-2 w-full cursor-pointer flex items-center justify-between hover:bg-[#1E1E1E] h-12 text-gray-300 relative group" // Added `relative` and `group` classes
                  >
                    <div className="flex items-center">
                      <div
                        className="w-1 h-6 rounded-lg mr-2"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      <li className=" text-sm font-normal truncate w-[120px]">{section.title}</li>
                    </div>

                    {/* Button initially hidden, visible on hover */}
                    <div className="">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSectionMenu(section._id)
                          handleMenuPosition(e);
                        }}
                        className=" rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <i className="ri-more-2-line"></i>
                      </button>
                      {(sectionMenu === section._id) &&
                        <Portal>
                          <ul
                            onClick={(e) => e.stopPropagation()}
                            className="w-44 bg-black shadow-lg z-[11]"
                            style={{ position: 'fixed', top: menuPosition.top, left: menuPosition.left }}
                          >
                            <li
                              onClick={() => updateSectionTitle(section._id, section.title)}
                              className="menu-item"
                            >
                              <i className="ri-pencil-line mr-1"></i> Rename Section
                            </li>
                            <li
                              onClick={() => deleteSection(section._id)}
                              className="menu-item">
                              <i className="ri-close-large-line mr-1"></i> Delete Section
                            </li>
                            <li onClick={() => setCreateBookModal(true)} className="menu-item">
                              <i className="ri-add-large-line mr-1"></i> New Section
                            </li>
                          </ul>
                        </Portal>
                      }
                    </div>
                  </ul>
                ))}
              </div>

            </div>

            {/* Pages Container */}
            <div className="w-1/2 flex flex-col items-center border-t-[1px] border-b-[1px] border-gray-700">
              <button
                onClick={handleCreatePage}
                className="bg-[#1E1E1E] w-full flex items-center text-sm text-gray-400 p-2"
              >
                <i className="ri-add-fill text-xl"></i>&nbsp;&nbsp;Add page
              </button>
              <div id="section-y-scroll" className="w-full h-full overflow-y-scroll ">
                {pages.map((page) => (
                  <ul
                    onClick={() => pageTitleChange(page._id)}
                    key={page._id}
                    className="py-2 cursor-pointer flex items-center hover:bg-[#1E1E1E] h-12 w-full text-gray-300"
                  >
                    <li onClick={sectionAndPageMenuForSmallScreen} className="px-2 text-sm font-normal truncate w-full">{page.title}</li>

                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Editor Section */}
        <div className="border-[1px] border-gray-700 w-full h-[577px]">
          <div className="py-2 px-4 border-b-[1px] border-gray-700 flex items-center justify-between w-full">
            <div className="flex md:items-end flex-col md:flex-row">
              <input
                value={pageTitle}
                onChange={handlePageTitleChange} // Update page title in real time
                type="text"
                className="text-base md:text-lg bg-transparent text-white outline-none border-b-[1px] border-gray-700"
              />
              <p className=" md:text-sm text-xs text-gray-500 mt-1 md:mt-0">
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
          <div className="p-3 md:p-4">
            <TinyEditor
              initialValue={currentPage?.content}
              pageID={pageID}
              pageTitle={pageTitle}
              setIsReload={setIsReload}
            />
          </div>

          <div onClick={sectionAndPageMenuForSmallScreen} className="cursor-pointer z-[11] bg-black fixed bottom-0 left-0 px-3 py-2 w-full  md:hidden">
            {sectionPageMenu ? <i className="ri-folder-5-fill text-xl mr-1"></i> :  <i className="ri-folder-fill text-xl mr-1"></i> } Sections & Pages
          </div>
        </div>
      </div>

      {/* Create Section Modal */}
      {createBookModal && (
        <FormModel
          text="Create New Section"
          onSubmit={handleCreateSection}
          label="Title Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          message={message}
          messageType={messageType}
          text1="Cancel"
          text2="Create"
          onClick={closeCreateSectionModal}
          loading={loading}

          createBookModal={createBookModal}
        />
      )}

      {/* Update section title model */}
      {updateTitleModel && (
        <FormModel
          message={message}
          messageType={messageType}
          text="Rename Notebook"
          text1="Cancle"
          text2="Update"
          onSubmit={handleUpdateSectionTitle}
          onClick={() => setUpdateTitleModel(false)}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          loading={loading}

          updateTitleModel={updateTitleModel}
        />
      )}

      {deleteSectionModel && (
        <DeleteWarning
          h1="Permanently Delete Section"
          p="Deleting a section can't be undone. Do you want to permanently delete this section and all of its pages?"
          text1="Permanently Delete"
          text2="Cancle"
          onClickDelete={handleDeleteSection}
          onClickCancle={() => setDeleteSectionModel(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SectionAndNotesPage;
