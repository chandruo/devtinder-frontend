import "./App.css";
import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Feed from "./components/Feed";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Profile from "./components/Profile";

function App() {
  return (
   
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/feed" element={<Feed />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
   
  );
}

export default App;
