import React, { useState } from "react";
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

import { client, gestion, admin, setting } from "./pages";

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

  const [pages] = useState(client);
  const [gestions] = useState(gestion);
  const [settings] = useState(setting);

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
        {pages.map((page, index) => (
          <ListItem button key={page.titre}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              {page.icon}
            </ListItemIcon>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {gestions.map((page, index) => (
          <ListItem button key={page.titre}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              {page.icon}
            </ListItemIcon>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {settings.map((setting, index) => (
          <ListItem button key={setting.titre}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              {setting.icon}
            </ListItemIcon>
            <ListItemText primary={setting.title} />
          </ListItem>
        ))}
      </List>

      {/* <List>
        {["Account", "Settings", "Exit"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </>
  );
};
