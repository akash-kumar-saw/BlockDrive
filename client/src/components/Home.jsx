import {useEffect, useState} from "react";

const home = ({state}) => {

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
                <h2 className="text-2xl text-black font-bold text-center">My Drive</h2>
            </div>
            <div className="flex flex-wrap justify-start overflow-y-auto p-5 border-2 rounded-tl-2xl bg-white border-black h-full w-full">
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
        </div>
        </>
    )
}

export default home;