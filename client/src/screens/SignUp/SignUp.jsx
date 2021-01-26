import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Grid } from "@material-ui/core";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router";

import Loading from "../../components/Loading/Loading";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/modules/User/userActions";

const SignUp = () => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

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

    if (password !== password2) {
      toast.error("Passwords do not match!");
    } else {
      dispatch(actions.signUpRequest({ name, email, password }));
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
          <h2>Sign Up</h2>
          <form className={classes.form} onSubmit={loginHandler}>
            <Input
              required
              label="Name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              required
              label="Email"
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
            <Input
              required
              label="Confirm Password"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/login"} style={{ color: "gray" }}>
                  Do you have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </Container>
  );
};

export default SignUp;

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
