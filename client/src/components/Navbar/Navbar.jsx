import { Link } from "react-router-dom"; 
import { links } from "../../constants/links"; 
import PersonPinIcon from '@mui/icons-material/PersonPin';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./Navbar.scss"; 

const Navbar = ({ menuOpen, setMenuOpen }) => {
    return (
        <div className={"navbar " + (menuOpen && "active")}>
            <div className="navbar-left">
                <Link to="/">Asador</Link>
            </div>
            <div className="navbar-right">
                <ul className="navbar-links">
                    {links.map((link) => (
                        <li key={link.id}>
                            <Link to={link.path}>{link.text}</Link> 
                        </li>
                    ))}
                        <li>
                            <Link to="/login"><AccountCircleIcon /></Link> 
                        </li>
                </ul>
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default Navbar