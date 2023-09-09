import {useState} from "react";

const access = ({state}) => {

    const [nftMetaData, setNftMetaData] = useState([]);
    const [accessList, setAccessList] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    const getAccessList = () => {
        const {contract}=state;
    
        const Func = async()=>{
          const content = await contract.getAccessList();
          setAccessList(content);
          console.log(content)
        }

        contract && Func();
        openModal();
    }

    const viewImage = () => {
        const {contract}=state;
        const address = document.getElementById("viewImage").value;
    
        const Func = async()=>{
          const content = await contract.getNFT(address);
          setNftMetaData(content);
          console.log(content)
        }

        contract && Func(); 
    }

    const allowAccess = () => {
        const {contract}=state;
        const address = document.getElementById("viewImage").value;
    
        const Func = async()=>{
          await contract.allowAccess(address);
          console.log("Access Allowed Successfully");
        }

        contract && Func(); 
    }

    const disallowAccess = () => {
        const {contract}=state;
        const address = document.getElementById("viewImage").value;
    
        const Func = async()=>{
          await contract.disallowAccess(address);
          console.log("Access Disallowed Successfully");
        }

        contract && Func(); 
    }



    return (
        <>
        <div className="flex flex-col bg-gray-200 h-screen w-screen items-center">
            <div className="p-5 w-full ">
                <h2 className="text-2xl text-black font-bold text-center">Access Manager</h2>
            </div>
            <div className="flex flex-col rounded-tl-2xl bg-white border-2 border-black h-screen w-full">
                <div className="flex flex-col  justify-center px-5 w-full h-[200px] shadow-md shadow-black">
                    <div className="flex items-center justify-center">
                        <input id="viewImage" className="border-2 border-black w-full focus:bg-gray-100 font-bold rounded-md shadow-md shadow-black h-[50px]" placeholder="Ethereum Address" />
                        <button onClick={allowAccess} className="bg-green-500 hover:bg-green-600 mx-5 font-bold h-[50px] w-[100px] rounded-2xl shadow-lg shadow-black">Allow</button>
                        <button onClick={disallowAccess} className="bg-red-500 hover:bg-red-600 font-bold h-[50px] w-[100px] rounded-2xl shadow-lg shadow-black">Disallow</button>
                    </div>
                    <button onClick={viewImage} className="bg-green-500 hover:bg-green-600 mt-2 font-bold h-[50px] rounded-lg shadow-lg shadow-black w-full">View Image</button>
                </div>
                <div className="flex flex-wrap justify-start overflow-y-auto p-5 h-full">
                    {nftMetaData.map((nft, index) => (
                        <div className="p-2 m-2 rounded-xl text-center w-[150px] h-[200px] border-2 border-black bg-gray-200 shadow-lg shadow-black hover:bg-gray-400">
                            <h3 className="font-bold overflow-hidden overflow-ellipsis">{nft.owner}</h3>
                            <a href={`https://gateway.ipfs.io/ipfs/${nft.ipfsHash}`}>
                                <img src={`https://gateway.ipfs.io/ipfs/${nft.ipfsHash}`} className="border-2 border-black w-full h-3/4"></img>
                            </a>
                            <h3 className="font-bold">{nft.caption}</h3>
                        </div>
                    ))}
                </div>
                <button onClick={getAccessList} className="h-[100px] bg-green-500 hover:bg-green-600 shadow-inner font-bold shadow-black" >Get Access List</button>
            </div>
        </div>

        {isModalOpen && (
            <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
                <div className="flex flex-col justify-center bg-white p-4 rounded-lg shadow-lg shadow-black">
                    <div className="flex items-center justify-center gap-2 font-bold">
                        <h6>Access List</h6>
                    </div>
                    <br />
                    <div className="max-h-[300px] overflow-auto" >
                        <ul className="list-decimal px-8 font-Poppins sm:text-sm text-xs !leading-5">
                            {accessList.map((address, index) => (
                            <li key={index}>{address}</li>
                            ))}
                        </ul>
                        <br />
                    </div>
                    <div className="flex justify-end">
                        <button onClick={closeModal} className="btn font-semibold rounded-br-xl border-2 border-black p-2 m-2">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default access;