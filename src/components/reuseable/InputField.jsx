
// eslint-disable-next-line react/prop-types
const InputField = ({inputRef, label ,value, onChange, type='text', name, placeholder }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="flex flex-col text-gray-500 text-sm leading-9">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full bg-[#1E1E1E] px-4 py-2 outline-none rounded-sm text-sm placeholder:text-xs placeholder:text-gray-600 placeholder:font-normal"
      />
    </div>
  )
}

export default InputField
