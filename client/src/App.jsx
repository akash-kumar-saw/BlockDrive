import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Sidebar from './layouts/Sidebar'
import Home from './components/Home'
import Access from './components/Access'
import Share from './components/Share'

const App = () => {

  const [state,setState]=useState({
    web3:null,
    contract:null,
    address:null
  })

  const [refresh, setRefresh] = useState(0);

  const refreshPage = () => {
    setRefresh(refresh+1);
  }
  
  const saveState=(state)=>{
    setState(state);
  }

  return (
    <Router>
      <div className="flex bg-gray-200">  
      <Sidebar saveState={saveState} state={state} refreshPage={refreshPage}/>
      <Routes>
        <Route exact path="/" element={<Home state={state} refresh={refresh}/>}/>
        <Route exact path="/Access" element={<Access state={state}/>}/>
        <Route exact path="/Share" element={<Share state={state} refresh={refresh}/>}/>
      </Routes>
      </div>
    </Router>
  )
}

export default App
