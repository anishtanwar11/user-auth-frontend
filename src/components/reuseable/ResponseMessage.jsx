
// eslint-disable-next-line react/prop-types
const ResponseMessage = ({message, messageType}) => {
    return (
        <>
        { message &&
        <p className={`${messageType === 'success'
            ? "border-[1px] border-dashed text-center rounded-full text-sm p-2 text-green-400  border-green-500"
            : "border-[1px] border-dashed text-center rounded-full text-sm p-2 text-red-400  border-red-500"}`}>
            {message}
        </p>
        }
        </>
    )
}

export default ResponseMessage
