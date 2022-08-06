import { Link, useNavigate } from "react-router-dom"; 
import { links } from "../../constants/links"; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from "react-redux"; 
import { logout, reset } from "../../redux/auth/authSlice"; 
import "./Navbar.scss"; 

const Navbar = ({ menuOpen, setMenuOpen }) => {
    // useNavigate
    const navigate = useNavigate(); 
    
    // useDispatch 
    const dispatch = useDispatch(); 
    
    // take user from AUTH redux
    const { user } = useSelector((state) => state.auth); 

    // handleLogout
    const handleLogout = () => {
        dispatch(logout()); 
        dispatch(reset()); 
        navigate("/"); 
    }; 

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
                    {user ? (
                        <li>
                            <LogoutIcon onClick={handleLogout} />
                        </li>
                    ) : (
                        <li>
                            <Link to="/login"><AccountCircleIcon /></Link> 
                        </li>
                        )
                    }
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