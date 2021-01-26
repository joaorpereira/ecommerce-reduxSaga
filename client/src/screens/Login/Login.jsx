import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Grid } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/modules/User/userActions";

const LoginScreen = () => {
  const classes = useStyles();

  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, isLoggedIn } = useSelector((state) => state.user);

  const { search } = useLocation();
  const redirect = search ? search.split("=")[1] : "/";

  useEffect(() => {
    if (isLoggedIn) {
      history.push(redirect);
    }
  }, [history, isLoggedIn, redirect]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(actions.loginRequest({ email, password }));
    if (isLoggedIn) {
      history.push("/");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.paper}>
          <h2>Sign In</h2>
          <form className={classes.form} onSubmit={loginHandler}>
            <Input
              required
              label="Email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              required
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/register"} style={{ color: "gray" }}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </Container>
  );
};

export default LoginScreen;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
