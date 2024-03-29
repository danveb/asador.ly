import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../components/index";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../redux/auth/authSlice";
import { toast } from "react-toastify";
import "../styles/Register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  // destructure formData 
  const { email, username, password } = formData;

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
      toast.success(`Welcome ${user.username} 🎉 `, {
        position: "top-center",
        autoClose: 1500,
        pauseOnHover: false,
      });
      navigate("/map");
    };
    // redirect existing user back home
    if (user) {
      navigate("/");
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
      email,
      username,
      password
    };
    // error checking with toast... 
    if (username.length < 3) {
      toast.error("Please create a new username. Minimum length is 3 characters.")
    } else if (password.length < 4) {
      toast.error("Please create a new password. Minimum length is 4 characters.");
    } else {
      dispatch(register(userData));
    };
  };

  if (isLoading) {
    return <Spinner />
  };

  return (
    <div className="register">
      <div className="register__wrapper">
        <div className="register__head">
          <h1>Register</h1>
          <p>Create an account to share with us your favorite <span>parrillas</span> in Buenos Aires.</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            placeholder="Your email address"
            autoComplete="email"
            required
          />
          <label
            htmlFor="username"
          >Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            type="text"
            placeholder="Create a username"
            autoComplete="username"
            required
          />
          <label
            htmlFor="password"
          >Password</label>
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
          <button>Register</button>
          <div className="login__link">
            <Link to="/login">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register