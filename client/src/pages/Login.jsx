import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../components/index";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../redux/auth/authSlice";
import { toast } from "react-toastify";
import "../styles/Login.scss";

const Login = () => {
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
    if (isError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
      });
    };
    if (isSuccess) {
      toast.success(`Welcome back ${user.username} 👋 `, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
      });
      navigate("/map");
    };
    // redirect existing user back to map
    if (user) {
      navigate("/map");
    };
    dispatch(reset());
    // dependency   
  }, [user, isError, isSuccess, message, navigate, dispatch]);

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
    if (username.length < 3) {
      toast.error("Username incorrect. Minimum length is 3 characters.");
    } else if (password.length < 4) {
      toast.error("Password incorrect. Minimum length is 4 characters.");
    } else {
      dispatch(login(userData));
    }
  };

  if (isLoading) {
    return <Spinner />
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__head">
          <h1>Login</h1>
          <p>Login and start pinning your favorite <span>parrillas</span> in Buenos Aires.</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
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
            autoComplete="username"
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
            autoComplete="off"
            required
          />
          <button>Login</button>
          <div className="register__link">
            <Link to="/register">Don't have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login