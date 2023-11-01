import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Sidebar from './layouts/Sidebar'
import Home from './components/Home'
import Access from './components/Access'
import Share from './components/Share'
import Refresh from './layouts/Refresh'

const App = () => {

  const [state,setState]=useState({
    web3:null,
    contract:null,
    address:null
  })

  const [refresh, setRefresh] = useState(0);
  const [displayRefresh, setDisplayRefresh] = useState(true);
  const [accessAddress, setAccessAddress] = useState("");
  const[isDarkMode, setDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

  const refreshPage = () => {
    setRefresh(refresh+1);
  }
  
  const saveState=(state)=>{
    setState(state);
  }

  return (
    <Router>
      <div className="flex bg-gray-200">  
        <Sidebar saveState={saveState} state={state} setDisplayRefresh={setDisplayRefresh} isDarkMode={isDarkMode} setDarkMode={setDarkMode}/>

        { (state.address!=null) && 
          <>
          <Routes>
            <Route exact path="/BlockDrive/" element={<Home state={state} refresh={refresh} isDarkMode={isDarkMode}/>}/>
            <Route exact path="/BlockDrive/Access" element={<Access state={state} refresh={refresh} setDisplayRefresh={setDisplayRefresh} accessAddress={accessAddress} setAccessAddress={setAccessAddress} isDarkMode={isDarkMode}/>}/>
            <Route exact path="/BlockDrive/Share" element={<Share state={state} refresh={refresh} setDisplayRefresh={setDisplayRefresh} isDarkMode={isDarkMode}/>}/>
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
              <div className="m-2 font-semibold text-4xl">Please Connect with a Wallet to Continue!</div>
              <div className="m-2 font-bold text-5xl">Powered By BlockChain</div>
            </div>
          </div>
        }

        
      </div>
    </Router>
  )
}

export default App
