import {useEffect, useState} from "react";
import Loadbar from "../layouts/Loadbar"
import Notification from "../layouts/Notification"
import Listview from "../layouts/Listview"

import document from "../assets/document.png"

const access = ({state, setDisplayRefresh, refresh, accessAddress, setAccessAddress, isDarkMode}) => {

    const [nftMetaData, setNftMetaData] = useState([]);
    const [accessList, setAccessList] = useState([]);
    const [isListview, setListview] = useState(false);
    const [isLoadbar, setLoadbar] = useState(false);
    const [userMessage, setUserMessage] = useState(null);
    const [addressTo, setAddressTo] = useState("");

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

    useEffect(() => {
        if (isListview) {
            setDisplayRefresh(false);
        } else {
            setDisplayRefresh(true);
        }
    },[isListview])

    useEffect(()=>{
        if (accessAddress!="") {

            setAddressTo(accessAddress);
            const {contract}=state;

            const Func = async()=>{
                try {
                    openLoadbar();
                    const content = await contract.getNFT(accessAddress);
                    setNftMetaData(content);
                    closeLoadbar();
                } catch (error) {
                    closeLoadbar();
                }
                
            }
            contract && Func();
        }
    },[refresh])

    const getAccessList = () => {
        
        const {contract}=state;
    
        const Func = async()=>{
            try {
                openLoadbar();

                const content = await contract.getAccessList();

                setAccessList([]);
                
                content.map((item, index) => {
                if (item.access)
                    setAccessList(prev => [...prev, item]);
                })

                closeLoadbar();
            } catch (error) {
                closeLoadbar();
            }
            
        }
        contract && Func();

        openListview();
    }

    const viewImage = () => {
    
        if (addressTo!="") {
            setAccessAddress(addressTo);
            const {contract}=state;

            const Func = async()=>{
                try {
                    openLoadbar();
                    const content = await contract.getNFT(addressTo);
                    setNftMetaData(content);
                    closeLoadbar();
                } catch (error) {
                    closeLoadbar();
                }
                
            }
            contract && Func();
            
        }
        else {
            setUserMessage("Please provide a Etherium Address");
        }
    }

    const allowAccess = () => {
    
        if (addressTo!="") {
            const {contract}=state;

            const Func = async()=>{
                try {
                    openLoadbar();
                    await contract.allowAccess(addressTo);
                    setUserMessage("Access Allowed Successfully!");
                    closeLoadbar();
                } catch (error) {
                    closeLoadbar();
                }
                
            }
            contract && Func(); 
            
        }
        else {
            setUserMessage("Please provide a Etherium Address");
        }
    }

    const disallowAccess = () => {        

        if (addressTo!="") {
            
            const {contract}=state;

            const Func = async()=>{
                try {
                    openLoadbar();
                    await contract.disallowAccess(addressTo);
                    setUserMessage("Access Disallowed Successfully!");
                    closeLoadbar();
                } catch (error) {
                    closeLoadbar();
                }

            }
            contract && Func(); 
            
        }
        else {
            setUserMessage("Please provide a Etherium Address");
        }
    }



    return (
        <>
        <div className={`flex flex-col h-screen w-screen items-center overflow-y-auto ${isDarkMode ? 'bg-darkPrimary' : 'bg-primary'}`}>
            <div className="p-5 w-full flex justify-between">
                <h2 className="text-2xl text-white font-bold text-center">Access Manager</h2>
                <h2 className="text-white font-bold">{"Address : " + state.address}</h2>
            </div>
            <div className={`flex flex-col rounded-tl-2xl border-2 border-black h-screen w-full ${isDarkMode ? 'bg-darkSecondary' : 'bg-secondary'}`}>
                <div className="flex flex-col  justify-center px-5 w-full h-[200px] shadow-md shadow-black">
                    <div className="flex items-center justify-center">
                        <input value={addressTo} onChange={(e)=>{setAddressTo(e.target.value)}} className="p-2 border-2 border-black w-full focus:bg-gray-100 font-bold rounded-md shadow-md shadow-black h-[50px]" placeholder="Ethereum Address" />
                        <button onClick={allowAccess} className="bg-blue-400 hover:bg-blue-500 mx-5 font-bold h-[50px] w-[100px] rounded-2xl shadow-lg shadow-black">Allow</button>
                        <button onClick={disallowAccess} className="bg-red-500 hover:bg-red-600 font-bold h-[50px] w-[100px] rounded-2xl shadow-lg shadow-black">Disallow</button>
                    </div>
                    <button onClick={viewImage} className="bg-blue-400 hover:bg-blue-500 mt-2 font-bold h-[50px] rounded-lg shadow-lg shadow-black w-full">View Files</button>
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
                <button onClick={getAccessList} className={`text-white h-[100px] shadow-inner font-bold shadow-black ${isDarkMode ? 'bg-darkPrimary hover:bg-darkSecondary' : 'bg-primary hover:bg-secondary'}`} >Get Access List</button>
            </div>
        </div>

        {
            isListview && (<Listview title="Access List" list={accessList} close={closeListview} isDarkMode={isDarkMode} />)
        }

        {
            isLoadbar && (<Loadbar />)
        }

        {
            userMessage!=null && (<Notification message={userMessage} setUserMessage={setUserMessage} />)
        }
        </>
    )
}

export default access;