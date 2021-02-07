import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Modal from "./Modal/Modal";
import Button from "../Button/Button";
import Badge from "@material-ui/core/Badge";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/modules/User/userActions";
import { useHistory } from "react-router";
import { USER_DETAILS_RESET } from "../../store/modules/User/userTypes";
import { USER_LIST_RESET } from "../../store/modules/AdminUser/userAdminTypes";
import { ORDER_LIST_PROFILE_RESET } from "../../store/modules/Order/orderTypes";
import { StyledTypography } from "./styled";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  brand: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  let history = useHistory();

  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_PROFILE_RESET });
    dispatch({ type: USER_LIST_RESET });
    history.push("/login");
  };

  const cart = useSelector((state) => state.cart);
  const { cart: cartItems } = cart;

  const count =
    cartItems && cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="sticky" className={classes.grow} elevation={0}>
      <Toolbar>
        <Button
          disableFocusRipple={true}
          disableRipple={true}
          disableElevation={true}
          className={classes.brand}
          onClick={() => history.push("/")}
        >
          <StyledTypography>E-Commerce</StyledTypography>
        </Button>
        <div className={classes.grow} />
        <div style={{ display: "flex" }}>
          {isLoggedIn ? (
            <>
              <Modal logoutHandler={logoutHandler} userInfo={user} />
              <Modal admin logoutHandler={logoutHandler} userInfo={user} />
            </>
          ) : (
            <IconButton onClick={() => history.push("/login")} color="inherit">
              <PersonIcon style={{ marginRight: "5px" }} />
              <Typography>Sign In</Typography>
            </IconButton>
          )}
          <IconButton onClick={() => history.push("/cart")} color="inherit">
            <Badge color="secondary" badgeContent={count ? count : null}>
              <ShoppingCartIcon style={{ marginRight: "10px" }} />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
