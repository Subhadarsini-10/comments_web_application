import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Comments from "./components/Comments";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/comments" element={<Comments currentUserId="1" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
