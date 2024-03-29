import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import Landing from "./pages/Landing";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeaderBoard from "./pages/LeaderBoard";

// console.log = () => {};
// console.error = () => {};
// console.warn = () => {};
function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
