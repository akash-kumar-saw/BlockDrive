import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Sidebar from './layouts/Sidebar'
import Home from './components/Home'
import Access from './components/Access'
import Share from './components/Share'

function App() {

  return (
    <Router>
      <div className="flex">  
      <Sidebar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/Access" element={<Access/>}/>
        <Route exact path="/Share" element={<Share/>}/>
      </Routes>
      </div>
    </Router>
  )
}

export default App
