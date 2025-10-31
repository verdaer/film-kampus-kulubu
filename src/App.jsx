

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ShowDetail from "./components/ShowDetails"; 

function App() {
 
  return (
    <Router>
      <div className="App">
        <h1>🎬 Kampüs Film Kulübü</h1>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/show/:id" element={<ShowDetail />} /> 
      
        </Routes>
      </div>
    </Router>
  );
}

export default App;