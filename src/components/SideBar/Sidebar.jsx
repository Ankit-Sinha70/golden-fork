import {
  AccountCircle,
  Add,
  AddBox,
  Assessment,
  Category,
  Close,
  ContactMail,
  Dashboard,
  Description,
  ExpandLess,
  ExpandMore,
  Kitchen,
  ListAlt,
  LocalOffer,
  MenuBook,
  Pages,
  People,
  PeopleAlt,
  PersonAdd,
  PersonSearch,
  Restaurant,
  RestaurantMenu,
  Settings,
  ShoppingCart,
  TableChart,
  Tune,
} from "@mui/icons-material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { ReactComponent as SiteLogo } from "../../../src/assets/images/icon/svg/Login/MainLogo.svg";

import "./Sidebar.scss";

const SideBar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const { isRole } = useSelector((state) => state.auth);

  // Menu List for different roles
  const MenuList = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <Dashboard />,
    },
    {
      name: "Restaurant",
      icon: <Restaurant />,
      submenu: [
        {
          name: "Restaurant List",
          link: "/admin/restaurant/list",
          icon: <ListAlt />,
        },
        {
          name: "Add Restaurant",
          link: "/admin/restaurant/add",
          icon: <Add />,
        },
      ],
    },
    // {
    //   name: "Kitchen Management",
    //   link: "/admin/kitchen",
    //   icon: <Kitchen />,
    //   submenu: [
    //     {
    //       name: "Kitchen List",
    //       link: "/admin/kitchen/list",
    //       icon: <ListAlt />,
    //     },
    //     {
    //       name: "Add Kitchen",
    //       link: "/admin/kitchen/add",
    //       icon: <Add />,
    //     },
    //   ],
    // },
    {
      name: "Menu Management",
      icon: <RestaurantMenu />,
      submenu: [
        {
          name: "Menu List",
          link: "/admin/kitchen-menu/list",
          icon: <MenuBook />,
        },
        {
          name: "Menu Category List",
          icon: <Category />,
          submenu: [
            {
              name: "Category List",
              link: "/admin/kitchen-menu/category/list",
              icon: <ListAlt />,
            },
            {
              name: "Add Category",
              link: "/admin/kitchen-menu/category/add",
              icon: <AddBox />,
            },
          ],
        },
        {
          name: "Add Menu",
          link: "/admin/kitchen-menu/add",
          icon: <AddBox />,
        },
      ],
    },
    {
      name: "Table Management",
      link: "/admin/tables",
      icon: <TableChart />,
    },
    // {
    //   name: "Customer / Users",
    //   link: "/admin/users",
    //   icon: <People />,
    //   submenu: [
    //     { name: "User List", link: "/admin/users/list", icon: <ListAlt /> },
    //     { name: "Add User", link: "/admin/user/add", icon: <PersonAdd /> },
    //   ],
    // },
    // {
    //   name: "Orders Management",
    //   link: "/admin/orders",
    //   icon: <ShoppingCart />,
    // },
    {
      name: "Offer Management",
      link: "/admin/offers",
      icon: <LocalOffer />,
      submenu: [
        {
          name: "Offer List",
          link: "/admin/offers/list",
          icon: <LocalOffer />,
        },
      ],
    },
    {
      name: "CMS Management",
      link: "/admin/cms",
      icon: <Pages />,
      submenu: [
        { name: "Page List", link: "/admin/cms/pages", icon: <Description /> },
      ],
    },
    {
      name: "Contact Us",
      link: "/admin/contact-us",
      icon: <ContactMail />,
    },
    {
      name: "Reports",
      link: "/admin/reports",
      icon: <Assessment />,
      submenu: [
        {
          name: "Table Reports",
          link: "/admin/reports/users",
          icon: <PeopleAlt />,
        },
        // {
        //   name: "Customer Reports",
        //   link: "/admin/reports/customers",
        //   icon: <PersonSearch />,
        // },
      ],
    },
    {
      name: "Settings",
      link: "/admin/settings",
      icon: <Settings />,
      submenu: [
        {
          name: "Profile",
          link: "/admin/settings/profile",
          icon: <AccountCircle />,
        },
        { name: "General", link: "/admin/settings/general", icon: <Tune /> },
      ],
    },
  ];

  const RestaurantMenuList = [
    {
      name: "Dashboard",
      link: "/admin/restaurant",
      icon: <Dashboard />,
    },
    {
      name: "Table Management ",
      link: "/admin/restaurant/table-management",
      icon: <TableChart />,
      submenu: [
        {
          name: "Table List",
          link: "/admin/restaurant/table-management/list",
          icon: <ListAlt />,
        },
        {
          name: "Add Table",
          link: "/admin/restaurant/table-management/add",
          icon: <PersonAdd />,
        },
      ],
    },
    {
      name: "Order Management",
      link: "/admin/restaurant/orders-management",
      icon: <ShoppingCart />,
    },
    {
      name: "Kitchen Menu",
      icon: <RestaurantMenu />,
      submenu: [
        { name: "Kitchen-menu List", link: "/admin/restaurant/kitchen-menu" },
      ],
    },
  ];

  const KitchenMenuList = [
    {
      name: "Dashboard",
      link: "/admin/kitchen",
      icon: <Dashboard />,
    },
    {
      name: "Order Ques",
      link: "/admin/kitchen/orders",
      icon: <ShoppingCart />,
    },
    {
      name: "Kitchen Menu",
      link: "/admin/kitchen/kitchen-menu",
      icon: <RestaurantMenu />,
      submenu: [
        { name: "Kitchen-menu List", link: "/admin/kitchen/kitchen-menu" },
      ],
    },
  ];

  // Dynamically get menu list based on role
  const getMenuList = () => {
    switch (isRole) {
      case "SuperAdmin":
        return MenuList;
      case "RestaurantAdmin":
        return RestaurantMenuList;
      case "KitchenStaff":
        return KitchenMenuList;
      default:
        return [];
    }
  };

  // Toggle submenu state
  const handleSubmenuToggle = (name) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Render menu items recursively
  const renderMenuItems = (menuItems) => {
    return menuItems.map((item, key) => {
      const isActive =
        location.pathname === item.link ||
        (item.submenu &&
          item.submenu.some(
            (subItem) =>
              location.pathname === !subItem.link ||
              (subItem.submenu &&
                subItem.submenu.some(
                  (deepSubItem) => location.pathname === !deepSubItem.link
                ))
          ));

      return (
        <li
          key={key}
          className={`sidebar__menu-item ${isActive ? "active" : ""}`}
        >
          {item.submenu ? (
            <>
              <button onClick={() => handleSubmenuToggle(item.name)}>
                <span>
                  {item.icon} {item.name}
                </span>
                {openSubmenus[item.name] ? <ExpandLess /> : <ExpandMore />}
              </button>
              {openSubmenus[item.name] && (
                <ul className="sidebar__menu-submenu">
                  {renderMenuItems(item.submenu)}
                </ul>
              )}
            </>
          ) : (
            <Link
              to={item.link}
              className={location.pathname === item.link ? "active" : ""}
            >
              <span>
                {item.icon} {item.name}
              </span>
            </Link>
          )}
        </li>
      );
    });
  };

  return (
    <div className={open ? "openMenu sidebar" : "sidebar"}>
      <a href="/" className="sidebar__logo">
        <SiteLogo />
      </a>
      <div className="sidebar__toggleBtn" onClick={() => setOpen(!open)}>
        {/* <img className="" src={HamburgerIcon} alt="hamburgerMenu" /> */}
        {!open ? <ExpandMore /> : <Close />}
      </div>
      <nav className="sidebar__nav">
        <h6 className="sidebar__nav-title">Menu</h6>
        <ul className="sidebar__menu">{renderMenuItems(getMenuList())}</ul>
      </nav>
    </div>
  );
};

export default SideBar;
