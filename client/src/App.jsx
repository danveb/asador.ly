import { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import { About, Register, Login } from "./components/index"; 
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false); 

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
                    <Route path="/about" element={<About menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
                    <Route path="/login" element={<Login menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
                    <Route path="/register" element={<Register menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
                </Routes>
            </Router>
            <ToastContainer />
        </>
    )
}

export default App