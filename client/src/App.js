import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";

import { Routes, Route } from "react-router-dom";
import RequireUser from "./components/RequireUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RequireUser/>}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
