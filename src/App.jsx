import "./App.css";
import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import DashBoard from "./pages/home";
import Home from "./Components/Home/Home";
import Feed from "./Components/Feed/Feed";
import Login from "./Components/Login/Login.jsx";
import Wallet from "./Components/Wallet/Wallet";
import OpenSeaSearch from "./Components/OpenSea Search/OpenSeaSearch";
import MonitoringTask from "./Components/Feed/MonitoringTask";
import Settings from "./Components/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact element={<Login />} />

        <Route path="/" element={<DashBoard />}>
          <Route path="" element={<Navigate to="/feed" />} />
          <Route path="Home" element={<Home />} />
          <Route path="feed" element={<Feed />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="openSea" element={<OpenSeaSearch />} />
          <Route path="createTask" element={<MonitoringTask />} />
          <Route path="editTask/:task_id" element={<MonitoringTask />} />
          <Route path="Settings" element={<Settings />} />
          {/* createTask */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
