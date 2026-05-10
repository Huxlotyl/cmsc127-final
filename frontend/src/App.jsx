import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Drivers from "./pages/Drivers.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/drivers" element={<Drivers />} />
      </Routes>
    </Router>
  );
}

export default App;
