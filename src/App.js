import React from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

// COMMON LAYOUTS
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/Sidebar";

// PUBLIC AND PRIVATE ROUTES
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

// PUBLIC PAGES (NOT FOUND , FORGOT PASSWORD ,LOGIN SCREEN)
import ForgotPassword from "./pages/public/ForgotPassword/ForgotPassword";
import Login from "./pages/public/Login/Login";
import NotFound from "./pages/public/NotFound/NotFound";

// SUPER ADMIN IMPORTS
// 1 . DASHBOARD
import Dashboard from "./pages/admin/pages/Dashboard/Dashboard";
// 2.  RESTURANT MANAGEMENT
import RestaurantDetails from "./pages/admin/pages/RestaurantManagement/RestaurantDetails/RestaurantDetails";
import RestaurantManagement from "./pages/admin/pages/RestaurantManagement/RestaurantManagement";
// 3.  KITCHEN MANAGEMENT
// 4.  KITCHEN MENU
import KitchenMenuAdd from "./pages/admin/pages/KitchenMenuManagement/KitchenMenuAdd/KitchenMenuAdd";
import KitchenMenuCategory from "./pages/admin/pages/KitchenMenuManagement/KitchenMenuCategory/KitchenMenuCategory";
import KitchenMenuManagement from "./pages/admin/pages/KitchenMenuManagement/KitchenMenuManagement";
// 5.  MENU ITEMS MANAGEMENT
// 6.  TABLE MANAEMENT
import TableManagement from "./pages/admin/pages/TableManagement/TableManagement";
// 7.  CUSTOMER MANAGEMENT
import AddUser from "./pages/admin/pages/CustomerManagement/AddUser/AddUser";
import CustomerManagement from "./pages/admin/pages/CustomerManagement/CustomerManagement";
import UserDetails from "./pages/admin/pages/CustomerManagement/UserDetails/UserDatails";
// 8.  ORDER MANAGEMENT
import OrderManagement from "./pages/admin/pages/OrderManagement/OrderManagement";
// 9.  CONTACT US
import ContactUs from "./pages/admin/pages/ContactUs/ContactUs";
// 10. REWARDS MANAGEMENT
import RewardsManagement from "./pages/admin/pages/RewardsManagement/RewardsManagement";
// 11. OFFER MANAGEMENT
import OfferManagement from "./pages/admin/pages/OfferManagement/OfferManagement";
// 12. CMS MANAGEMENT
import CMSManagement from "./pages/admin/pages/CMSManagement/CMSManagement";
// 13. REPORTS
import CustomerReport from "./pages/admin/pages/Report/CustomerReport";
import UserReport from "./pages/admin/pages/Report/UserReport";
// 14. SETTING
import Settings from "./pages/admin/pages/Settings/Settings";

// RESTURENT ADMIN IPORTS
import RestaurantDashboard from "./pages/admin/restaurant/pages/Dashboard/Dashboard";
import KitchenMenu from "./pages/admin/restaurant/pages/KitchenMenu/KitchenMenu";
import OrdersManagement from "./pages/admin/restaurant/pages/OrderManagement/OrdersManagement";
import AddTable from "./pages/admin/restaurant/pages/TableManagement/AddTable/AddTable";
import TablesList from "./pages/admin/restaurant/pages/TableManagement/Table-list/TablesList";
// KITCHEN ADMIN IMPORTS
import KitchenDashboard from "./pages/admin/kitchen/pages/Dashboard/Dashboard";
import KitchenMenuList from "./pages/admin/kitchen/pages/KitchenMenu/KitchenMenuList";
import OrderQues from "./pages/admin/kitchen/pages/OrderQues/OrderQues";

import "./App.scss";
import KitchenAdd from "./pages/admin/pages/KitchenManagement/KitchenAdd/KitchenAdd";
import KitchenManagement from "./pages/admin/pages/KitchenManagement/KitchenManagement";
import KichenMenuCategoryAdd from "./pages/admin/pages/KitchenMenuManagement/KitchenMenuCategory/KichenMenuCategoryAdd/KichenMenuCategoryAdd";
import KitchenMenuCategoryView from "./pages/admin/pages/KitchenMenuManagement/KitchenMenuCategory/KitchenMenuCategoryView/KitchenMenuCategoryView";
import KitchenMenuView from "./pages/admin/pages/KitchenMenuManagement/KitchenMenuView/KitchenMenuView";
import AddRestaurant from "./pages/admin/pages/RestaurantManagement/AddRestaurant/AddRestaurant";
import KitchenItemView from "./pages/admin/restaurant/pages/Kitchen-item-view/KitchenItemView";
import GeneralPage from "./pages/admin/pages/Settings/General/GeneralPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminMain />
            </PrivateRoute>
          }
        />

        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function AdminMain() {
  const { isRole } = useSelector((state) => state.auth);
  const roleBasedRoutes = () => {
    switch (isRole) {
      case "SuperAdmin":
        return (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="restaurant" element={<Navigate to="/admin" />} />
            <Route path="kitchen" element={<Navigate to="/admin" />} />
            <Route path="restaurant/list" element={<RestaurantManagement />} />
            <Route path="restaurant/add" element={<AddRestaurant />} />
            <Route path="restaurant/edit/:id" element={<AddRestaurant />} />
            <Route path="restaurant/view/:id" element={<RestaurantDetails />} />

            {/* <Route path="kitchen/list" element={<KitchenManagement />} /> */}
            <Route path="kitchen/add" element={<KitchenAdd />} />
            <Route path="kitchen/add/:id" element={<KitchenAdd />} />
            <Route path="kitchen/view/:id" element={<RestaurantDetails />} />

            <Route
              path="kitchen-menu/list"
              element={<KitchenMenuManagement />}
            />
            <Route path="kitchen-menu/view/:id" element={<KitchenMenuView />} />
            <Route path="kitchen-menu/add" element={<KitchenMenuAdd />} />
            <Route path="kitchen-menu/edit/:id" element={<KitchenMenuAdd />} />

            <Route
              path="kitchen-menu/category/list"
              element={<KitchenMenuCategory />}
            />
            <Route
              path="kitchen-menu/category/add"
              element={<KichenMenuCategoryAdd />}
            />
             <Route
              path="kitchen-menu/category/edit/:id"
              element={<KichenMenuCategoryAdd />}
            />

            <Route
              path="kitchen-menu/category/view/:id"
              element={<KitchenMenuCategoryView />}
            />

            <Route path="tables" element={<TableManagement />} />
            <Route path="settings/profile" element={<Settings />} />
            <Route path="settings/general" element={<GeneralPage />} />
            <Route path="reward-points" element={<RewardsManagement />} />
            <Route path="reports/users" element={<UserReport />} />
            {/* <Route path="reports/customers" element={<CustomerReport />} /> */}
            {/* <Route path="orders" element={<OrderManagement />} /> */}
            <Route path="offers/list" element={<OfferManagement />} />
            {/* <Route path="users/list" element={<CustomerManagement />} /> */}
            <Route path="user/add" element={<AddUser />} />
            <Route path="user/edit/:id" element={<AddUser />} />
            <Route path="user/view/:id" element={<UserDetails />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="cms/pages" element={<CMSManagement />} />
          </>
        );
      case "RestaurantAdmin":
        return (
          <>
            <Route path="/" element={<Navigate to="/admin/restaurant" />} />
            <Route path="restaurant" element={<RestaurantDashboard />} />
            <Route path="restaurant/kitchen-menu" element={<KitchenMenu />} />
            <Route
              path="kitchen-menu/view/:categoryId"
              element={<KitchenItemView />}
            />
            <Route
              path="restaurant/table-management/list"
              element={<TablesList />}
            />
            <Route
              path="restaurant/table-management/add"
              element={<AddTable />}
            />
            <Route
              path="restaurant/table-management/add/:id"
              element={<AddTable />}
            />
            <Route
              path="restaurant/orders-management"
              element={<OrdersManagement />}
            />

            <Route
              path="kitchen"
              element={<Navigate to="/admin/restaurant" />}
            />
          </>
        );
      case "KitchenStaff":
        return (
          <>
            <Route path="/" element={<Navigate to="/admin/kitchen" />} />
            <Route
              path="restaurant"
              element={<Navigate to="/admin/kitchen" />}
            />
            <Route path="kitchen" element={<KitchenDashboard />} />
            <Route path="kitchen/orders" element={<OrderQues />} />
            <Route path="kitchen/kitchen-menu" element={<KitchenMenuList />} />
          </>
        );
      default:
        return <Route path="*" element={<NotFound />} />;
    }
  };

  return (
    <div className="pageWrapper">
      <SideBar />
      <div className="pageWrapper-pages">
        <Header />
        <Routes>{roleBasedRoutes()}</Routes>
      </div>
    </div>
  );
}

export default App;
