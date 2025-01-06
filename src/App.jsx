import { useState } from 'react'
import Body from './components/Body'
import {Toaster} from "react-hot-toast"
function App() {
// here is the main app (testing)
  return (
      <div className=''>
        <Body/>
        <Toaster/>
      </div>
  )
}

export default App
