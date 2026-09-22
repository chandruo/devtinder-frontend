
import './App.css'
import Body from './components/Body'
import {BrowserRouter,Routes,Route} from "react-router-dom"



function App() {
  return (
    <>
   <BrowserRouter basename='/'>
     <Routes>
      <Route path="/" element={<Body />}>
         <Route path="/login" element={<div>login page</div>}></Route>
         
      </Route>
     </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
