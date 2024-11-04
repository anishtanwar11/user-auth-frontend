
// eslint-disable-next-line react/prop-types
const SubmitButton = ({ loading, text }) => {
  return (
    <button
      type="submit"
      className={`${(loading === false) ? "bg-[#24CFA6] text-black font-medium text-sm p-2 rounded-sm mt-2" : "items-center justify-center flex gap-x-2 bg-[#24CFA6] text-black font-medium text-sm p-1 rounded-sm mt-2"}`}
    >
      {(loading === false
        ? ""
        : <div className=" p-0 flex justify-center items-center m-0">
            <i className="ri-loader-2-fill text-lg animate-spin-slow m-0"></i>
          </div>
      )}{ text }
    </button>
  )
}

export default SubmitButton
