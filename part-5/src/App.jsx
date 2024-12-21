import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { setNotification, initBlog, loginUser, setter } from "./store";
import Users from "./components/Users";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SingleUser from "./components/SIngleUser";
import { getAll } from "./services/users";
import { setUsers } from "./store";
import Blogs from "./components/Blogs";
import BlogDetails from "./components/BlogDetails";
import { Container, Button, AppBar, Toolbar,Box, TextField, Typography } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  useEffect(() => {
    getAll().then((res) => {
      dispatch(setUsers(res));
    });
  }, []);

  const logoutHandler = (event) => {
    window.localStorage.removeItem("userData");
    dispatch(setter(null));
    dispatch(setNotification({ msg: "Logged Out Successfully", type: "ok" }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      dispatch(loginUser(username, password));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification({ msg: "Wrong credentials", type: "error" }));
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <h2>login to application</h2>
            <TextField
              data-testid="username"
              label="username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            ></TextField>
            <br></br>
            <TextField
              data-testid="password"
              label="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              sx={{marginTop:2}}
            ></TextField>
        </div>
        <br></br>
        <Button variant="contained" type="submit">
          login
        </Button>
      </form>
    );
  };

  const loggedInForm = () => {
    const styles = {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#D4D4D4",
      maxWidth: 400,
      padding: 10,
    };
    return (
      <div>
        <Router>
          <Box sx={{flexGrow:1}}>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
              <Box sx={{ ml: "auto" }}></Box>
              <em>{user.name} logged in</em>
              <Button color="inherit" onClick={logoutHandler}>
                logout
              </Button>
            </Toolbar>
          </AppBar>
          </Box>

          <Typography variant="h4" sx={{marginTop:2, marginBottom:2}}>Blog App</Typography>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Blogs />} />
            <Route path="/users/:id" element={<SingleUser />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
        </Router>
      </div>
    );
  };

  useEffect(() => {
    dispatch(initBlog());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("userData");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setter(user));
    }
  }, []);

  return (
    <Container>
      <div>
        <Notification />
        {user === null ? loginForm() : loggedInForm()}
      </div>
    </Container>
  );
};

export default App;
