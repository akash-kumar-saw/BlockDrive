import {useEffect, useState} from "react";

const share = ({state}) => {

    const [nftMetaData, setNftMetaData] = useState([]);

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
                <div className="flex items-center justify-center px-5 w-full h-[100px] shadow-md shadow-black">
                    <input className="border-2 border-black w-full focus:bg-gray-100 font-bold rounded-md shadow-md shadow-black h-[50px]" placeholder="Ethereum Address" />
                    <button className="bg-green-500 hover:bg-green-600 mx-5 font-bold h-[50px] w-[100px] rounded-2xl shadow-lg shadow-black">Share</button>
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
                <button className="h-[100px] bg-green-500 hover:bg-green-600 shadow-inner font-bold shadow-black" >Get Share List</button>
            </div>
        </div>
        </>
    )
}

export default share;