import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setUser, setCartId } from './redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import loginImage from './images/encore-thread-bg.jpg';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    try {
      await axios.post("/api/user/login", {
        username: username,
        password: password,
      }).then((res) => {
        console.log(res.data);

        if (res.data.message === "Username not exits") {
          alert("Username not exits");
        } else if (res.data.message === "Login Success") {
          console.log("User ID:", res.data.userId);
          dispatch(setUser({ id: res.data.userId }));
          fetchCart(res.data.userId);
          navigate(`/products`);
        } else {
          alert("Incorrect Username and Password not match");
        }
      }, fail => {
        console.error(fail);
      });
    } catch (err) {
      alert("An error occurred while trying to log in. Please try again.");
    }
  }

  const fetchCart = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/user/${userId}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const cart = await response.json();
        dispatch(setCartId(cart.cartId));
        console.log("Cart ID:", cart.cartId);
      } else {
        console.error("Failed to fetch cart items", response.status);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* Image on the left */}
        <div className="col-sm-6" style={{ paddingRight: '0', marginRight: 'auto', marginLeft: '0' }}>
          <img src={loginImage} alt="Login" style={{ width: '50%', height: 'auto' }} />
        </div>
  
        {/* Login container on the right */}
        <div className="col-sm-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Login</h2>
          <form style={{ width: '30%' }}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="username"
                className="form-control"
                id="username"
                placeholder="Enter Name"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
  
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={login}>
              Login
            </button>
          </form>
          <Link to="/register">Do not have an account? Sign up now!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;