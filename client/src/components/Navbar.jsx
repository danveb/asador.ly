import { Link, useNavigate } from "react-router-dom";
import { links } from "../constants/links";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../redux/auth/authSlice";
import { toast } from "react-toastify";
import "../styles/Navbar.scss";

const Navbar = () => {
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
    toast.info(`Sad to see you go ${user.username} 😭 `, {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: false,
    });
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav__logo">
        <Link to="/">Asador</Link>
      </div>
      <div className="nav__main">
        <ul className="nav__links">
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
      </div>
    </nav>
  )
}

export default Navbar