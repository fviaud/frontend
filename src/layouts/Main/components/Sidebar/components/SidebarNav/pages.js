import React from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FolderIcon from "@material-ui/icons/Folder";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShopIcon from "@material-ui/icons/Shop";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const client = [
  {
    title: "Dashboard",
    id: "dashboard",
    href: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Projects",
    id: "projets",
    href: "/projets",
    icon: <FolderIcon />,
    // disabled: !status.projets,
  },
  {
    title: "Catalogue",
    id: "catalogue",
    href: "/offres",
    icon: <StorefrontIcon />,
  },

  {
    title: "Cart",
    id: "shopping",
    href: "/Basket",
    icon: <ShoppingCartIcon />,
  },
  {
    title: "Order",
    id: "order",
    href: "/order",
    icon: <ShopIcon />,
  },
];

export const gestion = [
  {
    title: "Gestion",
    id: "gestion",
    href: "/gestion",
    icon: <AssignmentIcon />,
  },
  {
    title: "Users",
    id: "projets",
    href: "/projets",
    icon: <PeopleIcon />,
    // disabled: !status.projets,
  },
];

export const admin = [
  {
    title: "Gestion",
    id: "gestion",
    href: "/gestion",
    icon: <DashboardIcon />,
  },
  {
    title: "Users",
    id: "users",
    href: "/users",
    icon: <PeopleIcon />,
    // disabled: !status.projets,
  },
];

export const setting = [
  {
    title: "Account",
    id: "account",
    href: "/account",
    icon: <AccountBoxIcon />,
  },
  {
    title: "Settings",
    id: "settings",
    href: "/settings",
    icon: <SettingsIcon />,
    // disabled: !status.projets,
  },
  {
    title: "Exit",
    id: "exit",
    href: "/exit",
    icon: <ExitToAppIcon />,
    // disabled: !status.projets,
  },
];
