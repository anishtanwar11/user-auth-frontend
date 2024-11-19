import WarningIcon from "../../assets/icons/warning-icon.png";

const DeleteWarning = ({ h1, p, text1, text2, onClickDelete, onClickCancle }) => {
    return (
        <div className="z-[12] px-3 w-screen h-screen absolute top-0 left-0 right-0 bg-black/40 flex items-center justify-center">
            <div className="bg-black p-8 w-full max-w-xl">
                <h1 className="text-xl text-center sm:text-left text-gray-300 font-medium mb-4 font-[helvetica1]">{h1}</h1>

                <div className="flex items-start justify-center gap-x-2 mt-4">
                    <img src={WarningIcon} alt="warning-icon" className="w-10 h-10"/>
                    <p className="text-sm text-slate-300">{p}</p>
                </div>

                <div className="w-full flex items-center justify-center sm:justify-end gap-x-4 mt-8">
                    <button onClick={onClickDelete} className="bg-[#24CFA6] text-black px-3 py-1 rounded-sm text-sm " >{text1}</button>
                    <button onClick={onClickCancle} className="bg-white text-black px-3 py-1 rounded-sm text-sm" >{text2}</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteWarning
