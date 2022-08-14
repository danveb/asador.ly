import { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import { Navbar, Menu, Spinner } from "../index"; 
import { useSelector, useDispatch } from "react-redux"; 
import { login, reset } from "../../redux/auth/authSlice"; 
import { toast } from "react-toastify"; 

import "./Login.scss"; 

const Login = ({ menuOpen, setMenuOpen }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    }); 

    // destructure formData 
    const { username, password } = formData; 

    // useNavigate 
    const navigate = useNavigate(); 

    // useDispatch
    const dispatch = useDispatch(); 

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth); 

    // useEffect 
    useEffect(() => {
        if(isError) {
            toast.error(message, {
                position: "top-center", 
                autoClose: 2000, 
                pauseOnHover: true, 
            }); 
        }; 
        if(isSuccess) {
            toast.success(`Welcome back ${user.username} 👋 `, {
                position: "top-center", 
                autoClose: 1500, 
                hideProgressBar: true, 
            }); 
            navigate("/"); 
        }; 
        // redirect existing user back to home
        if(user) {
            navigate("/"); 
        }
        dispatch(reset()); 
    // dependency   
    }, [user, isError, isSuccess, message, navigate, dispatch])

    // handleChange
    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value
        })); 
    }; 

    // handleSubmit 
    const handleSubmit = (e) => {
        e.preventDefault(); 
        const userData = {
            username, 
            password, 
        }; 
        // // error checking with toast... 
        if(username.length < 3) {
            toast.error("Username incorrect. Minimum length is 3 characters.");
        } else if(password.length < 4) {
            toast.error("Password incorrect. Minimum length is 4 characters."); 
        } else {
            dispatch(login(userData)); 
        }
    }; 

    if(isLoading) {
        return <Spinner />
    }; 

    return (
        <div>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> 
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> 
            <div className="login">
                <div className="login-top">
                    <div className="login-title">
                        <h1>Login</h1>
                        <p>Login and start pinning your favorite <span>parrillas</span> in Buenos Aires.</p>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label
                            htmlFor="username"
                        >
                            Username</label>
                        <input 
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            type="text" 
                            placeholder="Your username" 
                            required
                        />
                        <label
                            htmlFor="password"
                        >
                            Password</label>
                        <input 
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
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