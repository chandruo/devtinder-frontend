
import './App.css'
import Body from './components/Body'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './components/Login'
import Feed from './components/Feed'



function App() {
  return (
    <>
   <BrowserRouter basename='/'>
     <Routes>
      <Route path="/" element={<Body />}>
         <Route path="/login" element={<Login />}></Route>       
         <Route path="/feed" element={<Feed />}></Route>       
      </Route>
     </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
