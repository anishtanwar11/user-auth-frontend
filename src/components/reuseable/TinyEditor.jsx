import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import SubmitButton from "../reuseable/SubmitButton.jsx"

const TinyEditor = () => {
  const [content, setContent] = useState('');

  const handleEditorChange = (newContent) => {
    setContent(newContent)
  };

  const saveNote=()=>{
    console.log("content--", content)
  }
  return (
    <div className="">
      <Editor
        apiKey="mcsvow0jw1e94pevhlkj6haro6pacj2rv4xye2d1v138v6wx"
        initialValue="<p>This is the initial content of the editor</p>"
        value={content}
        init={{
          height: 500,
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

      <SubmitButton onClick={saveNote} loading={false} text="Save"/>
    </div>
  )
}

export default TinyEditor
