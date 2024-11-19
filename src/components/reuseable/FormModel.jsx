import { useEffect, useRef } from "react"
import InputField from "./InputField.jsx"

const FormModel = ({ 
    onSubmit, 
    value, 
    onChange, 
    text, 
    onClick, 
    text1, 
    text2, 
    label, 
    message, 
    messageType ,

    createbook,
    createBookModal,
    updateTitleModel,
    updateNotebookTitleModel
}) => {

    const inputRef = useRef(null); // Create a ref for the input field

    useEffect(() => {
        if(createbook || createBookModal || updateTitleModel ||updateNotebookTitleModel && inputRef.current){
            inputRef.current.focus();
        }
    },[createbook, createBookModal])

    return (
        <div className="z-[12] px-3 w-screen h-screen fixed top-0 left-0 right-0 bg-black/40 flex items-center justify-center">
            <form onSubmit={onSubmit} className="bg-black p-8 w-full max-w-md">
                <h1 className="text-xl text-gray-300 font-medium mb-2">{text}</h1>
                <InputField
                    inputRef={inputRef}
                    label={label}
                    value={value}
                    onChange={onChange}
                />

                {message && (
                    <p className={`text-xs mt-2 ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                        {message} 
                    </p>
                )}

                <div className="w-full flex items-center justify-end gap-x-4 mt-4">
                    <button onClick={onClick} className="bg-white text-black px-3 py-1 rounded-sm text-sm" >{text1}</button>
                    <button type="submit" className="bg-[#24CFA6] text-black px-3 py-1 rounded-sm text-sm " >{text2}</button>
                </div>
            </form>
        </div>
    )
}

export default FormModel
