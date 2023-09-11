import {useEffect, useState} from "react";
import Loadbar from "../layouts/Loadbar"
import Listview from "../layouts/Listview"
import Notification from "../layouts/Notification"

const share = ({state, refresh}) => {

    const [nftMetaData, setNftMetaData] = useState([]);
    const [shareList, setShareList] = useState([]);
    const [isListview, setListview] = useState(false);
    const [selectedNft, setSelectedNft] = useState(null);
    const [isLoadbar, setLoadbar] = useState(false);
    const [userMessage, setUserMessage] = useState(null);

    useEffect(()=>{
        const {contract, address}=state;
    
        const Func = async()=>{
          const content = await contract.getNFT(address);
          setNftMetaData(content);
          console.log(content)
        }

        contract && Func();
        
    },[state, refresh])

    const openListview = () => {
        setListview(true);
    }

    const closeListview = () => {
        setListview(false);
    }

    const openLoadbar = () => {
        setLoadbar(true);
    }

    const closeLoadbar = () => {
        setLoadbar(false);
    }

    const selectNFT = (nft) => {
        setSelectedNft(nft);
    }
    
    const shareNFT = () => {
        const addressTo = document.getElementById("addressTo").value;

        if (addressTo!="") {
            openLoadbar();
            const {contract}=state;
            const Func = async()=>{
                console.log(selectedNft.tokenId.toNumber())
                await contract.shareAccess(addressTo, selectedNft.tokenId.toNumber());
                setUserMessage("NFT/Image Shared Successfully!")
            }
            contract && Func();
            closeLoadbar();
        }
        else {
            setUserMessage("Please provide a Etherium Address")
        }
    }

    const getShareList = () => {
        openLoadbar();
        const {contract}=state;
    
        const Func = async()=>{
          const content = await contract.getSharedList();
          setShareList(content);
          console.log(content)
        }

        contract && Func();

        closeLoadbar();
        openListview();
    }

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

        {
            isListview && (<Listview title="Share List" list={shareList} close={closeListview} />)
        }

        {
            userMessage!=null && (<Notification message={userMessage} setUserMessage={setUserMessage} />)
        }

        {
            isLoadbar && (<Loadbar />)
        }
        </>
    )
}

export default share;