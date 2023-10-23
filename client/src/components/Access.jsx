import {useState} from "react";
import Loadbar from "../layouts/Loadbar"
import Notification from "../layouts/Notification"
import Listview from "../layouts/Listview"

const access = ({state}) => {

    const [nftMetaData, setNftMetaData] = useState([]);
    const [accessList, setAccessList] = useState([]);
    const [isListview, setListview] = useState(false);
    const [isLoadbar, setLoadbar] = useState(false);
    const [userMessage, setUserMessage] = useState(null);

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

    const getAccessList = () => {
        openLoadbar();
        const {contract}=state;
    
        const Func = async()=>{
            const content = await contract.getAccessList();
            
            content.map((item, index) => {
            if (item.access)
                setAccessList(prev => [...prev, item]);
            })
        }

        contract && Func();

        closeLoadbar();
        openListview();
    }

    const viewImage = () => {
        const address = document.getElementById("viewImage").value;
    
        if (address!="") {
            openLoadbar();
            const {contract}=state;

            const Func = async()=>{
            const content = await contract.getNFT(address);
            setNftMetaData(content);
            }
            contract && Func();
            closeLoadbar();
        }
        else {
            setUserMessage("Please provide a Etherium Address");
        }
    }

    const allowAccess = () => {
        const address = document.getElementById("viewImage").value;
    
        if (address!="") {
            openLoadbar();
            const {contract}=state;

            const Func = async()=>{
            await contract.allowAccess(address);
            setUserMessage("Access Allowed Successfully!");
            }
            contract && Func(); 
            closeLoadbar();
        }
        else {
            setUserMessage("Please provide a Etherium Address");
        }
    }

    const disallowAccess = () => {        
        const address = document.getElementById("viewImage").value;
    
        if (address!="") {
            openLoadbar();
            const {contract}=state;

            const Func = async()=>{
            await contract.disallowAccess(address);
            setUserMessage("Access Disallowed Successfully!");
            }
            contract && Func(); 
            closeLoadbar();
        }
        else {
            setUserMessage("Please provide a Etherium Address");
        }
    }



    return (
        <>
        <div className="flex flex-col bg-gray-600 h-screen w-screen items-center">
            <div className="p-5 w-full flex justify-between">
                <h2 className="text-2xl text-white font-bold text-center">Access Manager</h2>
                <h2 className="text-white font-bold">{"Address : " + state.address}</h2>
            </div>
            <div className="flex flex-col rounded-tl-2xl bg-white border-2 border-black h-screen w-full">
                <div className="flex flex-col  justify-center px-5 w-full h-[200px] shadow-md shadow-black">
                    <div className="flex items-center justify-center">
                        <input id="viewImage" className="border-2 border-black w-full focus:bg-gray-100 font-bold rounded-md shadow-md shadow-black h-[50px]" placeholder="Ethereum Address" />
                        <button onClick={allowAccess} className="bg-blue-400 hover:bg-blue-500 mx-5 font-bold h-[50px] w-[100px] rounded-2xl shadow-lg shadow-black">Allow</button>
                        <button onClick={disallowAccess} className="bg-red-500 hover:bg-red-600 font-bold h-[50px] w-[100px] rounded-2xl shadow-lg shadow-black">Disallow</button>
                    </div>
                    <button onClick={viewImage} className="bg-blue-400 hover:bg-blue-500 mt-2 font-bold h-[50px] rounded-lg shadow-lg shadow-black w-full">View Image</button>
                </div>
                <div className="flex flex-wrap justify-start overflow-y-auto p-5 h-full">
                    {nftMetaData.map((nft, index) => (
                        <div className="p-2 m-2 rounded-xl text-center w-[150px] h-[200px] border-2 border-black bg-gray-200 shadow-lg shadow-black hover:bg-gray-400">
                            <h3 className="font-bold overflow-hidden overflow-ellipsis">{nft.owner}</h3>
                            <a href={`https://gateway.ipfs.io/ipfs/${nft.ipfsHash}`} target="_blank">
                                <img src={`https://gateway.ipfs.io/ipfs/${nft.ipfsHash}`} className="border-2 border-black w-full h-3/4"></img>
                            </a>
                            <h3 className="font-bold">{nft.caption}</h3>
                        </div>
                    ))}
                </div>
                <button onClick={getAccessList} className="h-[100px] bg-blue-400 hover:bg-blue-500 shadow-inner font-bold shadow-black" >Get Access List</button>
            </div>
        </div>

        {
            isListview && (<Listview title="Access List" list={accessList} close={closeListview} />)
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