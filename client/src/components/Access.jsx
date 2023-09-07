function access() {
    return (
        <>
        <div className="flex flex-col bg-gray-200 h-screen w-screen items-center">
            <div className="p-5 w-full ">
                <h2 className="text-2xl text-black font-bold text-center">Access Manager</h2>
            </div>
            <div className="flex flex-col rounded-tl-2xl bg-white border-2 border-black h-full w-full">
                <div className="flex items-center justify-center px-5 w-full h-[100px] shadow-md shadow-black">
                    <input className="border-2 border-black w-full focus:bg-gray-100 font-bold rounded-md shadow-md shadow-black h-[50px]" placeholder="Ethereum Address" />
                    <button className="bg-green-500 hover:bg-green-600 mx-5 font-bold h-[50px] w-[100px] rounded-2xl shadow-lg shadow-black">Allow</button>
                    <button className="bg-red-500 hover:bg-red-600 font-bold h-[50px] w-[100px] rounded-2xl shadow-lg shadow-black">Disallow</button>
                </div>
                <div className="p-5 h-full">
                    <a href="https://google.com">
                        <div className="p-2 rounded-xl text-center w-[150px] h-[200px] border-2 border-black bg-gray-200 shadow-lg shadow-black hover:bg-gray-400">
                            <h3 className="font-bold">Address</h3>
                            <img src="" className="border-2 border-black w-full h-3/4"></img>
                            <h3 className="font-bold">Caption</h3>
                        </div>
                    </a>
                </div>
                <button className="h-[100px] bg-green-500 hover:bg-green-600 shadow-inner font-bold shadow-black" >Get Access List</button>
            </div>
        </div>
        </>
    )
}

export default access;