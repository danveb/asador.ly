import { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import About from "./pages/About";

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false); 

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
                    <Route path="/about" element={<About menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
                </Routes>
            </Router>
        </>
    )
}

export default App