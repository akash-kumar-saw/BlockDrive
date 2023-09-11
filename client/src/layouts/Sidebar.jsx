import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ethers } from 'ethers';
import ABI from "../ABI.json";
import Loadbar from "./Loadbar"
import Notification from "./Notification"

import bloackchain from '../assets/blockchain.png';

const sidebar = ({state, saveState}) => {
    const navigate = useNavigate();

    const [connected,setConnected]=useState(false);
    const [accountAddress, setAccountAddress] = useState("");
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [isLoadbar, setLoadbar] = useState(false);
    const [userMessage, setUserMessage] = useState(null);
    const [navigation, setNavigation] = useState("");

    const openDialog = () => {
        setDialogOpen(true);
    };
    
    const closeDialog = () => {
        setDialogOpen(false);
        
        setFile(null);
        setFileName("");
    };

    const openLoadbar = () => {
        setLoadbar(true);
    }

    const closeLoadbar = () => {
        setLoadbar(false);
    }

    const retrieveFile = (e) => {
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
          setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };

    const connectWallet =async()=>{
        try{
            const contractAddress = "0x658C9e7769da169E78E99B3e77BaCC71ec7c0997";
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const accounts = await provider.send("eth_requestAccounts", []);

                const contract = new ethers.Contract(contractAddress, ABI, signer);

                setConnected(true);
                setNavigation("Home");
                setAccountAddress(accounts[0]);
                saveState({web3:provider,contract:contract,address:accounts[0]});

                window.ethereum.on('accountsChanged', (accounts) => {
                    setAccountAddress(accounts[0]);
                    saveState({address:accounts[0]});
                });

            } else {
                setUserMessage("MetaMask Not Found");
            }
        }catch(error){
            setUserMessage(error);
        }  
    }

    const submitImageToPinata = async () => {
        if (file) {
            try {
                openLoadbar();
                const caption = document.getElementById('caption').value;
                const formData = new FormData();
                formData.append("file", file);
        
                const pinataEndpoint = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        
                const headers = {
                    pinata_api_key: "b67a409c6fbd47e86ab7",
                    pinata_secret_api_key: "926ca103c6c57c2d0fa379783d5248622a9e8b691a06154165e353c131e34580",
                };

                const options = {
                    pinataMetadata: {
                      name: fileName,
                    },
                };
      
                const response = await axios.post(pinataEndpoint, formData, {headers, options});
      
                if (response.status === 200) {
                    const { IpfsHash } = response.data;

                    const {contract} = state;
                    await contract.mintNFT(IpfsHash, caption);
                    setUserMessage("NFT Minted Successfully!");
                } else {
                    setUserMessage("Failed to upload to IPFS : ", response.data);
                }
                closeDialog();
                closeLoadbar();
            }catch (error) {
                setUserMessage("Error uploading image to IPFS :", error);
            }
        }
    };
    
    return (
        <>
        <div className="flex flex-col h-screen w-[200px] items-center bg-gray-200">
            <div className="flex p-5">
                <img src={bloackchain} className="w-[40px] h-[40px]" />
                <h2 className="text-2xl text-blue-500 font-bold text-center ml-2">BlockDrive</h2>
            </div>
            <button onClick={connectWallet} className={`text-xl ${ connected ? 'bg-green-500' : 'bg-red-500' } ${ connected ? 'hover:bg-green-600' : 'hover:bg-red-600' } font-bold text-center m-2 p-2 border-2 shadow-md shadow-black border-black rounded-xl w-[150px]`}>{ connected ? 'Connected' : 'Connect to MetaMask' }</button>
            <button onClick={openDialog} disabled={!connected} className={`text-xl font-bold text-center m-2 p-2 border-2 shadow-md shadow-black border-black rounded-xl bg-white w-[150px] ${connected ? 'hover:bg-blue-300' : 'hover:bg-gray-400'} `}>Add Image</button>
            <button onClick={()=>{navigate('/'); setNavigation("Home")}} disabled={!connected} className={`text-sm font-bold text-center m-2 p-2 border-2 border-black rounded-3xl w-[190px] ${navigation=="Home" ? 'bg-blue-300' : 'bg-none'} focus:bg-blue-300 hover:bg-gray-400`}>My Drive</button>
            <button onClick={()=>{navigate('/Access'); setNavigation("Access")}} disabled={!connected} className={`text-sm font-bold text-center m-2 p-2 border-2 border-black rounded-3xl w-[190px] ${navigation=="Access" ? 'bg-blue-300' : 'bg-none'} focus:bg-blue-300 hover:bg-gray-400`}>Access Manager</button>
            <button onClick={()=>{navigate('/Share'); setNavigation("Share")}} disabled={!connected} className={`text-sm font-bold text-center m-2 p-2 border-2 border-black rounded-3xl w-[190px] ${navigation=="Share" ? 'bg-blue-300' : 'bg-none'} focus:bg-blue-300 hover:bg-gray-400`}>Share NFT/Image</button>
        </div>

        {isDialogOpen && (
            <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
            <div className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-lg shadow-black">
                <h3 className="text-xl font-bold m-2">Add Image</h3>
                <input type="file" accept="image/*" onChange={retrieveFile} className="font-semibold" />
                {file && (
                <div>
                    <img src={URL.createObjectURL(file)} alt={fileName} className="m-2 max-h-32" />
                    <p className="font-semibold m-2">{fileName}</p>
                    <input id='caption' className="border-2 border-black w-full focus:bg-gray-100 font-semibold rounded-md shadow-md shadow-black h-[50px]" placeholder="Caption"/>
                </div>
                )}
                <div className="flex justify-center">
                    <button onClick={closeDialog} className="m-4 bg-red-500 text-white rounded-md p-2 hover:bg-red-600 w-[100px]">
                    Cancel
                    </button>
                    <button disabled={!file} onClick={submitImageToPinata} className="m-4 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 w-[100px]">
                    Submit
                    </button>
                </div>
            </div>
            </div>
        )}

        {
            userMessage!=null && (<Notification message={userMessage} setUserMessage={setUserMessage} />)
        }

        {
            isLoadbar && (<Loadbar />)
        }
        </>
    )
}

export default sidebar;