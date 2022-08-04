import Navbar from "../components/Navbar/Navbar";
import Menu from "../components/Menu/Menu"; 
import Hero from "../components/Hero/Hero";

const Home = ({ menuOpen, setMenuOpen }) => {
    return (
        <div>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Hero />
        </div>
    )
}

export default Home