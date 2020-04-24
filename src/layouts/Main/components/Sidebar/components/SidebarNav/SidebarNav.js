import React, { forwardRef, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { client, gestion, admin, setting } from "./../../menu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  const theme = useTheme();
  const { handleDrawerClose } = props;

  const [clients] = useState(client);
  const [gestions] = useState(gestion);
  const [settings] = useState(setting);

  const CustomRouterLink = forwardRef((props, ref) => (
    <div ref={ref} style={{ flexGrow: 1 }}>
      <RouterLink {...props} />
    </div>
  ));

  return (
    <>
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {clients.map((client, index) => (
          <ListItem
            button
            key={client.titre}
            component={CustomRouterLink}
            to={client.href}
          >
            <ListItemIcon>{client.icon}</ListItemIcon>
            <ListItemText primary={client.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {gestions.map((page, index) => (
          <ListItem button key={page.titre}>
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {settings.map((setting, index) => (
          <ListItem button key={setting.titre}>
            <ListItemIcon>{setting.icon}</ListItemIcon>
            <ListItemText primary={setting.title} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
