function home() {
    return (
        <>
        <div className="flex flex-col bg-gray-200 h-screen w-screen items-center">
            <div className="p-5 w-full ">
                <h2 className="text-2xl text-black font-bold text-center">My Drive</h2>
            </div>
            <div className="p-5 border-2 rounded-tl-2xl bg-white border-black h-full w-full">
                <a href="https://google.com">
                    <div className="p-2 rounded-xl text-center w-[150px] h-[200px] border-2 border-black bg-gray-200 shadow-lg shadow-black hover:bg-gray-400">
                        <h3 className="font-bold">Address</h3>
                        <img src="" className="border-2 border-black w-full h-3/4"></img>
                        <h3 className="font-bold">Caption</h3>
                    </div>
                </a>
            </div>
        </div>
        </>
    )
}

export default home;