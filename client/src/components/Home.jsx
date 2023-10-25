import {useEffect, useState} from "react";

import document from "../assets/document.png"

const home = ({state, refresh}) => {

    const [nftMetaData, setNftMetaData] = useState([]);
    const [defaultMetaData, setDefaultMetaData] = useState([]);

    useEffect(()=>{
        const {contract, address}=state;
    
        const Func = async()=>{
          const content = await contract.getNFT(address);
          setNftMetaData(content);
          setDefaultMetaData(content);
          console.log(content)
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
        <div className="flex flex-col bg-gray-600 h-screen w-screen items-center overflow-y-auto">
            <div className="p-5 w-full flex justify-between">
                <h2 className="text-2xl text-white font-bold text-center">My Drive</h2>
                <h2 className="text-white font-bold">{"Address : " + state.address}</h2>
            </div>
            <div className="flex flex-col rounded-tl-2xl bg-white border-2 border-black h-screen w-full">
                <div className="flex flex-col  justify-center p-5 w-full shadow-md shadow-black">
                        <input onChange={displaySearch} id="searchInput" className="p-2 border-2 border-black w-full focus:bg-gray-100 font-bold rounded-md shadow-md shadow-black h-[50px]" placeholder="Search" />
                </div>
                <div className="flex flex-wrap justify-start overflow-y-auto p-5 h-full">
                    {nftMetaData.map((nft, index) => (
                        <div className="p-2 m-2 rounded-xl text-center w-[150px] h-min border-2 border-black bg-gray-200 shadow-lg shadow-black hover:bg-gray-400">
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
        </>
    )
}

export default home;