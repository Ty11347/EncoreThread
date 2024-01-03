import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setUser } from './redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";

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
          navigate(`/products`);
        } else {
          alert("Incorrect Username and Password not match");
        }
      }, fail => {
        console.error(fail);
      });
    } catch (err) {
      alert(err);
    }
  }

  return (
      <div>
        <div class="container">
          <div class="row" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            <div class="col-sm-6">
              <h2>Login</h2>
              <form>
                <div class="form-group">
                  <label>Username</label>
                  <input type="username" class="form-control" id="username" placeholder="Enter Name"

                         value={username}
                         onChange={(event) => {
                           setUsername(event.target.value);
                         }}

                  />

                </div>

                <div class="form-group">
                  <label>Password</label>
                  <input type="password" class="form-control" id="password" placeholder="Enter Password"

                         value={password}
                         onChange={(event) => {
                           setPassword(event.target.value);
                         }}

                  />
                </div>
                <button type="submit" class="btn btn-primary" onClick={login}>Login</button>
              </form>
              <Link to="/register">Do not have an account? Sign up now!</Link>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;