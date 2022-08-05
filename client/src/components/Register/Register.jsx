import { Link } from "react-router-dom"; 
import { Navbar, Menu } from "../index"; 
import "./Register.scss"; 

const Register = ({ menuOpen, setMenuOpen }) => {
    return (
        <div>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> 
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> 
            <div className="register">
                <div className="register-top">
                    <div className="register-title">
                        <h1>Register</h1>
                        <p>Create an account to share with us your favorite <span>parrillas</span> in Buenos Aires.</p>
                    </div>
                    <form className="register-form">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Create a username" 
                            required
                        />
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="Your email address" 
                            required
                        />
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Your password" 
                            required
                        />
                        <button>Register</button>
                        <Link to="/login">Already have an account?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register