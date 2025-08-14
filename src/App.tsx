import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TitleUpdater from "./components/TitleUpdater/TitleUpdater";
import Home from "./pages/Home";
import DonoBox from "./components/DonoBox/DonoBox";
import Thanks from "./pages/Thanks";
import Settings from "./pages/Settings";

function App() {
  // Any changes made to the routes should also be reflected in the TitleUpdater component

  return (
    <>
      <Router>
        <TitleUpdater />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        <DonoBox />
      </Router>
    </>
  );
}

export default App;
