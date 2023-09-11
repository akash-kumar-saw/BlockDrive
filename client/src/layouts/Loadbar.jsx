const loadbar = () => {
    return (
        <>
            <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50 ">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
        </>
    )
}

export default loadbar;