import {useEffect, useState} from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import Loadbar from "../layouts/Loadbar";

import document from "../assets/document.png"

const home = ({state, refresh, isDarkMode, toogleSideBar}) => {

    const [nftMetaData, setNftMetaData] = useState([]);
    const [defaultMetaData, setDefaultMetaData] = useState([]);
    const [isLoadbar, setLoadbar] = useState(false);

    const openLoadbar = () => {
        setLoadbar(true);
    }

    const closeLoadbar = () => {
        setLoadbar(false);
    }

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
            <div className="p-5 w-full flex items-center">
                <div onClick={() => toogleSideBar()} className="rounded-lg bg-white/40 p-2 m-2 w-min">
                    <HiMenuAlt2 size={34} />
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between  w-full">
                    <h2 className="text-2xl text-white font-bold text-center px-2">My Drive</h2>
                    <h2 className="text-white font-bold px-2">{"Address : " + state.address}</h2>
                </div> 
            </div>
            <div className={`flex flex-col rounded-t-2xl border-2 border-black h-screen w-full ${isDarkMode ? 'bg-darkSecondary' : 'bg-secondary'}`}>
                <div className="flex flex-col  justify-center p-5 w-full shadow-md shadow-black">
                        <input onChange={displaySearch} id="searchInput" className="p-2 border-2 border-black w-full focus:bg-gray-100 font-bold rounded-md shadow-md shadow-black h-[50px]" placeholder="Search" />
                </div>
                <div className="flex flex-wrap justify-start overflow-y-auto p-5 h-full">
                    {nftMetaData.map((nft, index) => (
                        <div className={`p-2 m-2 rounded-xl text-center w-[150px] h-min border-2 border-black bg-gray-200 shadow-lg shadow-black ${isDarkMode ? 'hover:bg-darkSecondary' : 'hover:bg-secondary'}`}>
                            <h3 className="font-bold overflow-hidden overflow-ellipsis">{nft.owner}</h3>
                            <a href={`https://gateway.ipfs.io/ipfs/${nft.ipfsHash}`} target="_blank">
                                { nft.fileType === "image" ? (
                                    <img src={`https://gateway.ipfs.io/ipfs/${nft.ipfsHash}`} className="border-2 border-black w-full h-3/4"></img>
                                ) : (
                                    <img src={document} className="border-2 border-black w-full h-auto"></img>
                                )
                                }
                            </a>
                            <h3 className="font-semibold">{`Caption : ${nft.caption}`}</h3>
                            <h3 className="font-bold">{nft.fileName}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {
            isLoadbar && (<Loadbar />)
        }
        </>
    )
}

export default home;