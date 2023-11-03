import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Sidebar from './layouts/Sidebar'
import Home from './components/Home'
import Access from './components/Access'
import Share from './components/Share'
import Refresh from './layouts/Refresh'

import MetaMask from './assets/metamask.png'

const App = () => {

  const [state,setState]=useState({
    web3:null,
    contract:null,
    address:null
  })

  const [refresh, setRefresh] = useState(0);
  const [displayRefresh, setDisplayRefresh] = useState(true);
  const [accessAddress, setAccessAddress] = useState("");
  const [showSideBar, setSideBar] = useState(true);
  const[isDarkMode, setDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  const refreshPage = () => {
    setRefresh(refresh+1);
  }

  const toogleSideBar = () => {
    setSideBar(!showSideBar);
  }
  
  const saveState=(state)=>{
    setState(state);
  }

  return (
    <Router>
      <div className="flex bg-gray-200">  
        <Sidebar saveState={saveState} state={state} setDisplayRefresh={setDisplayRefresh} isDarkMode={isDarkMode} setDarkMode={setDarkMode} showSideBar={showSideBar} toogleSideBar={toogleSideBar}/>

        { (state.address!=null) && 
          <>
          <Routes>
            <Route exact path="/BlockDrive/" element={<Home state={state} refresh={refresh} isDarkMode={isDarkMode} toogleSideBar={toogleSideBar}/>}/>
            <Route exact path="/BlockDrive/Access" element={<Access state={state} refresh={refresh} setDisplayRefresh={setDisplayRefresh} accessAddress={accessAddress} setAccessAddress={setAccessAddress} isDarkMode={isDarkMode} toogleSideBar={toogleSideBar}/>}/>
            <Route exact path="/BlockDrive/Share" element={<Share state={state} refresh={refresh} setDisplayRefresh={setDisplayRefresh} isDarkMode={isDarkMode} toogleSideBar={toogleSideBar}/>}/>
          </Routes>
          <Refresh refreshPage={refreshPage} displayRefresh={displayRefresh}  isDarkMode={isDarkMode}/>
          </>
        }

        { (state.address==null) && 
          <div className={`flex flex-col h-screen w-screen items-center overflow-y-auto ${isDarkMode ? 'bg-darkPrimary' : 'bg-primary'}`}>
            <div className="p-5 w-full ">
              <h2 className="text-2xl text-white font-bold text-center">Made with 💖 by Akash Kumar Saw</h2>
            </div> 
            <div className={`flex flex-col rounded-tl-2xl items-center justify-center rounded-tl-2x border-2 border-black h-screen w-full ${isDarkMode ? 'bg-darkSecondary' : 'bg-secondary'}`}>
              <img src={MetaMask} className="m-2 h-[100px] md:h-[200px]" />
              <div className="m-2 font-semibold text-2xl md:text-4xl text-center">Please Connect to MetaMask to Continue!</div>
              <div className="m-2 font-bold text-3xl md:text-5xl text-center">Powered By BlockChain</div>
            </div>
          </div>
        }

        
      </div>
    </Router>
  )
}

export default App
