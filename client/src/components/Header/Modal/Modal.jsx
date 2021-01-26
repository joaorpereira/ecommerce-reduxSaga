import React, { useRef, useState } from "react";
import {
  IconButton,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function Modal({ logoutHandler, userInfo, admin }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  let history = useHistory();

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        onClick={handleToggle}
      >
        {!admin && <PersonIcon style={{ marginRight: "5px" }} />}
        <Typography>{admin ? "Admin" : userInfo.name}</Typography>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  {admin ? (
                    <>
                      <MenuItem onClick={() => history.push("/admin/users")}>
                        Users
                      </MenuItem>
                      <MenuItem onClick={() => history.push("/admin/products")}>
                        Products
                      </MenuItem>
                      <MenuItem onClick={() => history.push("/admin/orders")}>
                        Orders
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={() => history.push("/profile")}>
                        <SettingsIcon style={{ marginRight: "5px" }} />
                        Profile
                      </MenuItem>
                      <MenuItem onClick={logoutHandler}>
                        <ExitToAppIcon style={{ marginRight: "5px" }} />
                        Logout
                      </MenuItem>
                    </>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
