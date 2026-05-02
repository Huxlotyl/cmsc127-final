import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin.jsx";
import Dashboard from "./pages/Dash-sample.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;