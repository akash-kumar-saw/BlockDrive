import bloackchain from '../assets/blockchain.png';

function sidebar() {
    return (
        <>
        <div className="flex flex-col h-screen w-[200px] items-center shadow-lg shadow-black bg-gray-200">
            <div className="flex p-5">
                <img src={bloackchain} className="w-[40px] h-[40px]" />
                <h2 className="text-2xl text-blue-500 font-bold text-center ml-2">BlockDrive</h2>
            </div>
            <div className="border-2 border-black w-full"></div>
            <button className="text-xl font-bold text-center m-2  mt-5 p-2 border-2 shadow-md shadow-black border-black rounded-xl bg-white w-[150px] hover:bg-blue-300">Add Image</button>
            <button className="text-sm font-bold text-center m-2 p-2 border-2 border-black rounded-3xl w-[190px] focus:bg-blue-300 hover:bg-gray-400">My Drive</button>
            <button className="text-sm font-bold text-center m-2 p-2 border-2 border-black rounded-3xl w-[190px] focus:bg-blue-300 hover:bg-gray-400">Access Manager</button>
            <button className="text-sm font-bold text-center m-2 p-2 border-2 border-black rounded-3xl w-[190px] focus:bg-blue-300 hover:bg-gray-400">Share NFT/Image</button>
            
        </div>
        </>
    )
}

export default sidebar;