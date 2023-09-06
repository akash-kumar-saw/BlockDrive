function home() {
    return (
        <>
        <div className="flex flex-col h-screen w-screen items-center">
            <div className="p-5 w-full bg-gray-200">
                <h2 className="text-2xl text-black font-bold text-center">My Drive</h2>
            </div>
            <div className="p-5 border-2 border-black h-full w-full">
                <a href="https://google.com">
                    <div className="p-2 text-center w-[150px] h-[200px] border-2 border-black shadow-lg shadow-black hover:shadow-blue-500">
                        <h3>Address</h3>
                        <img src="" className="border-2 border-black w-full h-3/4"></img>
                        <h3>Caption</h3>
                    </div>
                </a>
            </div>
        </div>
        </>
    )
}

export default home;