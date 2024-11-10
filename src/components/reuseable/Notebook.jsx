import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Notebook = ({ searchQuery, notebookTitles }) => {
  const navigate = useNavigate();

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
          onClick={() => navigate(`/notebook/${elem._id}`)}
          className="cursor-pointer flex items-center mb-4 text-gray-300"
        >
          <i className="ri-book-2-fill text-xl mr-2"></i>
          <li className="text-lg font-normal">{elem.title}</li>
        </ul>
      ))}
    </div>
  );
};

export default Notebook;
