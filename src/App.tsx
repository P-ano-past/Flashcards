import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DonoBox from "./components/DonoBox/DonoBox";
import Thanks from "./pages/Thanks";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>

        <DonoBox />
      </Router>
    </>
  );
}

export default App;
