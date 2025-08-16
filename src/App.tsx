import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TitleUpdater from "./components/TitleUpdater/TitleUpdater";
import Home from "./pages/Home";
import DonoBox from "./components/DonoBox/DonoBox";
import Thanks from "./pages/Thanks";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Landing from "./pages/About";
import Header from "./components/Header";

function App() {
  // Any changes made to the routes should also be reflected in the TitleUpdater component
  //TODO: Configure authenticated sections vs unauthenticated using RBAC
  //TODO: Build out user profile
  //TODO: Build out settings page as admin role
  //TODO: Set branding to associate with brand name

  return (
    <>
      <Router>
        <TitleUpdater />
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/profile" element={<Profile/>}/> */}
        </Routes>

        <DonoBox />
      </Router>
    </>
  );
}

export default App;
