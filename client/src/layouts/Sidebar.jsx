import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import bloackchain from '../assets/blockchain.png';

function sidebar() {
    const navigate = useNavigate();

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const openDialog = () => {
        setDialogOpen(true);
    };
    
    const closeDialog = () => {
        setDialogOpen(false);
        
        setFile(null);
        setFileName("");
     };

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
    
    return (
        <>
        <div className="flex flex-col h-screen w-[200px] items-center bg-gray-200">
            <div className="flex p-5">
                <img src={bloackchain} className="w-[40px] h-[40px]" />
                <h2 className="text-2xl text-blue-500 font-bold text-center ml-2">BlockDrive</h2>
            </div>
            <button onClick={openDialog} className="text-xl font-bold text-center m-2 p-2 border-2 shadow-md shadow-black border-black rounded-xl bg-white w-[150px] hover:bg-blue-300">Add Image</button>
            <button onClick={()=>navigate('/')} className="text-sm font-bold text-center m-2 p-2 border-2 border-black rounded-3xl w-[190px] focus:bg-blue-300 hover:bg-gray-400">My Drive</button>
            <button onClick={()=>navigate('/Access')} className="text-sm font-bold text-center m-2 p-2 border-2 border-black rounded-3xl w-[190px] focus:bg-blue-300 hover:bg-gray-400">Access Manager</button>
            <button onClick={()=>navigate('/Share')} className="text-sm font-bold text-center m-2 p-2 border-2 border-black rounded-3xl w-[190px] focus:bg-blue-300 hover:bg-gray-400">Share NFT/Image</button>
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
                </div>
                )}
                <div className="flex justify-center">
                    <button onClick={closeDialog} className="m-4 bg-red-500 text-white rounded-md p-2 hover:bg-red-600 w-[100px]">
                    Cancel
                    </button>
                    <button disabled={!file} className="m-4 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 w-[100px]">
                    Submit
                    </button>
                </div>
            </div>
            </div>
        )}
        </>
    )
}

export default sidebar;