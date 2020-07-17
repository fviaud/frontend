import React, { forwardRef, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import UserAvatar from "components/UserAvatar";

import SearchInput from "components/SearchInput";

export default (props) => {
  const { curentUser, setQuery } = props;
  const { onSignInClick } = props;
  const { signOut } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    signOut();
  };

  const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <RouterLink {...props} />
    </div>
  ));

  return (
    <AppBar color="inherit">
      <Toolbar>
        <Box display="flex" mr={2}>
          <Typography color="inherit" variant="h6">
            {process.env.REACT_APP_TITLE}
          </Typography>
        </Box>
        <Box flexGrow={1}>
          <SearchInput setQuery={setQuery} />
        </Box>
        {!curentUser ? (
          // <ButtonGroup color="inherit" variant="outlined">
          //   <Button>Sign up</Button>
          //   <Button onClick={onSignInClick}>Sign in</Button>
          // </ButtonGroup>
          <Button onClick={onSignInClick} color="inherit">
            Login
          </Button>
        ) : (
          <>
            {/* <Button
              component={CustomRouterLink}
              to={"/Projets"}
              color="inherit"
            >
              Console
            </Button> */}
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {/* <UserAvatar user={user} /> */}
              <Avatar>
                <PersonIcon />
              </Avatar>
            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                component={CustomRouterLink}
                to={"/Favoris"}
                onClick={handleClose}
              >
                favoris
              </MenuItem>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
