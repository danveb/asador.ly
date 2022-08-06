import { Link, useNavigate } from "react-router-dom";
import { links } from "../../constants/links"; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from "react-redux"; 
import { logout, reset } from "../../redux/auth/authSlice"; 
import "./Menu.scss"; 

const Menu = ({ menuOpen, setMenuOpen }) => {
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
        <div className={"menu " + (menuOpen && "active")}>
            <ul>
                {links.map((link)=> (
                    <li key={link.id} onClick={()=> setMenuOpen(!menuOpen)}>
                        <Link to={`${link.path}`}>{link.text}</Link>
                    </li>
                ))}
                {user ? (
                    <li>
                        <LogoutIcon onClick={handleLogout} />
                    </li>
                ) : (
                    <li>
                        <Link to="/login" onClick={()=> setMenuOpen(!menuOpen)}><AccountCircleIcon /></Link> 
                    </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Menu