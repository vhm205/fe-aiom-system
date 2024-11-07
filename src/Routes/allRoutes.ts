// auth
import UserProfile from "pages/Authentication/UserProfile";
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/LogOut";
import Register from "pages/Authentication/Register";

// dashboard
import Ecommerce from "pages/Dashboards/Ecommerce";
import UserManagement from "pages/Dashboards/User/UserManagement";

// product
import ProductList from "pages/Dashboards/Product/ProductList";
import ProductCreate from "pages/Dashboards/Product/ProductCreate";

interface RouteObject {
  path: string;
  component: React.ComponentType<any>; // Use React.ComponentType to specify the type of the component
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // Dashboard
  { path: "/", component: Ecommerce },
  { path: "/dashboard", component: Ecommerce },
  { path: "/users", component: UserManagement },
  { path: "/products", component: ProductList },
  { path: "/products/create", component: ProductCreate },

  // profile
  { path: "/user-profile", component: UserProfile },
];

const publicRoutes = [
  // authentication
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/register", component: Register },
];

export { authProtectedRoutes, publicRoutes };
