import {useEffect, useState} from "react";

const share = ({state}) => {

    const [nftMetaData, setNftMetaData] = useState([]);
    const [shareList, setShareList] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedNft, setSelectedNft] = useState(null);

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    const selectNFT = (nft) => {
        setSelectedNft(nft);
    }
    
    const shareNFT = () => {
        const {contract}=state;
        const addressTo = document.getElementById("addressTo").value;
    
        const Func = async()=>{
            console.log(selectedNft.tokenId.toNumber())
          await contract.shareAccess(addressTo, selectedNft.tokenId.toNumber());
          console.log("Shared Successfully")
        }

        contract && Func();
    }

    const getShareList = () => {
        const {contract}=state;
    
        const Func = async()=>{
          const content = await contract.getSharedList();
          setShareList(content);
          console.log(content)
        }

        contract && Func();
        openModal();
    }


    useEffect(()=>{
        const {contract, address}=state;
    
        const Func = async()=>{
          const content = await contract.getNFT(address);
          setNftMetaData(content);
          console.log(content)
        }

        contract && Func();
        
    },[state])

    return (
        <>
        <div className="flex flex-col bg-gray-200 h-screen w-screen items-center">
            <div className="p-5 w-full ">
                <h2 className="text-2xl  text-black font-bold text-center">Share NFT/Image</h2>
            </div>
            <div className="flex flex-col rounded-tl-2xl bg-white border-2 border-black h-full w-full">
                {
                    selectedNft && <div className="flex items-center justify-center px-5 w-full h-[100px] shadow-md shadow-black">
                    <input id="addressTo" className="border-2 border-black w-full focus:bg-gray-100 font-bold rounded-md shadow-md shadow-black h-[50px]" placeholder="Ethereum Address" />
                    <button onClick={shareNFT} className="bg-green-500 hover:bg-green-600 mx-5 font-bold h-[50px] w-[100px] rounded-2xl shadow-lg shadow-black">Share</button>
                </div>
                }
                <div className="flex flex-wrap justify-start overflow-y-auto p-5 h-full">
                    {nftMetaData.map((nft, index) => (
                        <div onClick={() => selectNFT(nft)} className="p-2 m-2 rounded-xl text-center w-[150px] h-[200px] border-2 border-black bg-gray-200 shadow-lg shadow-black hover:bg-gray-400">
                            <div className="flex justify-end">
                                <h3 className="font-bold overflow-hidden overflow-ellipsis">{nft.owner}</h3>
                                <input type="radio" name="selectedNFT" checked={selectedNft === nft} onChange={() => selectNFT(nft)} />
                            </div>
                            <img src={`https://gateway.ipfs.io/ipfs/${nft.ipfsHash}`} className="border-2 border-black w-full h-3/4"></img>
                            <h3 className="font-bold">{nft.caption}</h3>
                        </div>
                    ))}
                </div>
                <button onClick={getShareList} className="h-[100px] bg-green-500 hover:bg-green-600 shadow-inner font-bold shadow-black" >Get Share List</button>
            </div>
        </div>

        {isModalOpen && (
            <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
                <div className="flex flex-col justify-center bg-white p-4 rounded-lg shadow-lg shadow-black">
                    <div className="flex items-center justify-center gap-2 font-bold">
                        <h6>Share List</h6>
                    </div>
                    <br />
                    <div className="max-h-[300px] overflow-auto" >
                        <ul className="list-decimal px-8 font-Poppins sm:text-sm text-xs !leading-5">
                            {shareList.map((address, index) => (
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

export default share;