import { configureStore } from "@reduxjs/toolkit";
import adminUserReducer from "./slices/adminUserSlice";
import authReducer from "./slices/authSlice";
import cmsReducer from "./slices/cmsSlice";
import contactUsReducer from "./slices/contactUsSlice";
import kitchenReducer from "./slices/kitchenSlice";
import menuCategoryReducer from "./slices/menuCategorySlice";
import menuItemReducer from "./slices/menuItemSlice";
import menuReducer from "./slices/menuSlice";
import orderReducer from "./slices/orderSlice";
import reportReducer from "./slices/reportSlice";
import reservationReducer from "./slices/reservationSlice";
import restaurantReducer from "./slices/restaurantSlice";
import tableReducer from "./slices/tableSlice";
import KitchenAdminReducer from "./slices/kitchenAdminSlice";
const store = configureStore({
  reducer: {
    cms: cmsReducer,
    auth: authReducer,
    menu: menuReducer,
    menuItem: menuItemReducer,
    reservation: reservationReducer,
    adminUser: adminUserReducer,
    table: tableReducer,
    restaurant: restaurantReducer,
    contactus: contactUsReducer,
    report: reportReducer,
    menuCategory: menuCategoryReducer,
    orders: orderReducer,
    kitchen: kitchenReducer,
    KitchenAdmin:KitchenAdminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
