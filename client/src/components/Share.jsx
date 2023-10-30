import {useEffect, useState} from "react";
import Loadbar from "../layouts/Loadbar"
import Listview from "../layouts/Listview"
import Notification from "../layouts/Notification"

import document from "../assets/document.png"

const share = ({state, refresh, setDisplayRefresh, isDarkMode}) => {

    const [nftMetaData, setNftMetaData] = useState([]);
    const [defaultMetaData, setDefaultMetaData] = useState([]);
    const [shareList, setShareList] = useState([]);
    const [isListview, setListview] = useState(false);
    const [selectedNft, setSelectedNft] = useState(null);
    const [isLoadbar, setLoadbar] = useState(false);
    const [userMessage, setUserMessage] = useState(null);
    const [addressTo, setAddressTo] = useState("");

    useEffect(()=>{
        const {contract, address}=state;
    
        const Func = async()=>{
            try {
                openLoadbar();
                const content = await contract.getNFT(address);
                setNftMetaData(content);
                setDefaultMetaData(content);
                closeLoadbar();
            } catch (error) {
                closeLoadbar();
            }
            
        }
        contract && Func();
        
    },[state, refresh])

    useEffect(() => {
        if (isListview) {
            setDisplayRefresh(false);
        } else {
            setDisplayRefresh(true);
        }
    },[isListview])

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
        const {address}=state;
        
        if (nft.owner.toUpperCase() == address.toUpperCase()) {
            setSelectedNft(nft);
        } else {
            setUserMessage("You are not the Owner of the Token")
        }
    }
    
    const shareNFT = () => {
        if (addressTo!="") {
            const {contract}=state;

            const Func = async()=>{
                try {
                    openLoadbar();
                    await contract.shareAccess(addressTo, selectedNft.tokenId.toNumber());
                    setUserMessage("NFT/Image Shared Successfully!")
                    closeLoadbar();
                } catch (error) {
                    closeLoadbar();
                }
                
            }
            contract && Func();
            
        }
        else {
            setUserMessage("Please provide a Etherium Address")
        }
    }

    const getShareList = () => {
        
        const {contract}=state;
    
        const Func = async()=>{
            try {
                openLoadbar();

                const content = await contract.getSharedList();

                setShareList([]);
                
                content.map((item, index) => {
                    if (item.access)
                        setShareList(prev => [...prev, item]);
                })

                closeLoadbar();
            } catch (error) {
                closeLoadbar();
            }
            
        }
        contract && Func();

        openListview();
    }

    const displaySearch = (e) => {
        const searchText = e.target.value;

        if (searchText.trim() === "" || nftMetaData.length == 0) {
            setNftMetaData(defaultMetaData);
        } else {         
            const filteredData = nftMetaData.filter((nft) =>
              nft.caption.toLowerCase().includes(searchText.toLowerCase()) || 
              nft.fileName.toLowerCase().includes(searchText.toLowerCase())
            );
            setNftMetaData(filteredData);
        }
    }

    return (
        <>
        <div className={`flex flex-col h-screen w-screen items-center overflow-y-auto ${isDarkMode ? 'bg-darkPrimary' : 'bg-primary'}`}>
            <div className="p-5 w-full flex justify-between">
                <h2 className="text-2xl  text-white font-bold text-center">Share NFT/File</h2>
                <h2 className="text-white font-bold">{"Address : " + state.address}</h2>
            </div>
            <div className={`flex flex-col rounded-tl-2xl border-2 border-black h-screen w-full ${isDarkMode ? 'bg-darkSecondary' : 'bg-secondary'}`}>
                {
                    selectedNft && <div className="flex items-center justify-center px-5 w-full h-[100px] shadow-md shadow-black">
                    <input value={addressTo} onChange={(e) => setAddressTo(e.target.value)} className="p-2 border-2 border-black w-full focus:bg-gray-100 font-bold rounded-md shadow-md shadow-black h-[50px]" placeholder="Ethereum Address" />
                    <button onClick={shareNFT} className="bg-blue-400 hover:bg-blue-500 mx-5 font-bold h-[50px] w-[100px] rounded-2xl shadow-lg shadow-black">Share</button>
                </div>
                }
                <div className="flex flex-col  justify-center p-2 px-5 w-full shadow-md shadow-black">
                    <input onChange={displaySearch} id="searchInput" className="p-2 border-2 border-black w-full focus:bg-gray-100 font-bold rounded-md shadow-md shadow-black h-[50px]" placeholder="Search" /> 
                </div>
                <div className="flex flex-wrap justify-start overflow-y-auto p-5 h-full">
                    {nftMetaData.map((nft, index) => (
                        <div onClick={() => selectNFT(nft)} className={`p-2 m-2 rounded-xl text-center w-[150px] h-min border-2 border-black bg-gray-200 shadow-lg shadow-black ${isDarkMode ? 'hover:bg-darkSecondary' : 'hover:bg-secondary'}`}>
                            <div className="flex justify-end">
                                <h3 className="font-bold overflow-hidden overflow-ellipsis">{nft.owner}</h3>
                                <input type="radio" name="selectedNFT" checked={selectedNft === nft} onChange={() => selectNFT(nft)} />
                            </div>
                            { nft.fileType === "image" ? (
                                <img src={`https://gateway.ipfs.io/ipfs/${nft.ipfsHash}`} className="border-2 border-black w-full h-3/4"></img>
                            ) : (
                                <img src={document} className="border-2 border-black w-full h-auto"></img>
                            )
                            }
                            <h3 className="font-semibold">{`Caption : ${nft.caption}`}</h3>
                            <h3 className="font-bold">{nft.fileName}</h3>
                        </div>
                    ))}
                </div>
                <button onClick={getShareList} className={`text-white h-[100px] shadow-inner font-bold shadow-black ${isDarkMode ? 'bg-darkPrimary hover:bg-darkSecondary' : 'bg-primary hover:bg-secondary'}`} >Get Share List</button>
            </div>
        </div>

        {
            isListview && (<Listview title="Share List" list={shareList} close={closeListview} isDarkMode={isDarkMode} />)
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