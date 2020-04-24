import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Badge, IconButton, Avatar } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  flexGrow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: "black",
    background: "white",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default (props) => {
  const classes = useStyles();

  const { handleDrawerOpen, open } = props;
  const [notifications] = useState([]);

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <RouterLink to="/dashboard" noWrap>
          <img
            id="logo"
            alt="Logo"
            src="/images/logo_getIT_small_transparent.png"
            height="20"
          />
        </RouterLink>

        <div className={classes.flexGrow} />

        <RouterLink to="/Basket" id="basket">
          <IconButton aria-label="cart">
            <Badge
              // badgeContent={ressources + projets}
              color="primary"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </RouterLink>

        {/* <IconButton color="inherit">
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton> */}
        <Avatar
          alt="curentUser"
          // src={apiAvatars + curentUser.avatar}
          // className={classes.small}
        />
        <IconButton
          // className={classes.signOutButton}
          color="inherit"
          // onClick={() => {
          //   handleClickLogout();
          // }}
        >
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
