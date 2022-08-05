import { Link } from "react-router-dom"; 
import { Navbar, Menu } from "../index"; 
import "./Login.scss"; 

const Login = ({ menuOpen, setMenuOpen }) => {
    return (
        <div>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> 
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> 
            <div className="login">
                <div className="login-top">
                    <div className="login-title">
                        <h1>Login</h1>
                        <p>Create an account to share with us your favorite <span>parrillas</span> in Buenos Aires.</p>
                    </div>
                    <form className="login-form">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Create a username" 
                            required
                        />
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Your password" 
                            required
                        />
                        <button>Login</button>
                        <Link to="/register">Need to create a new account?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login