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

// receipt import
import ReceiptImportCreate from "pages/Dashboards/Receipt/ReceiptImport/ReceiptImportCreate";
import ReceiptImportUpdate from "pages/Dashboards/Receipt/ReceiptImport/ReceiptImportUpdate";
import ReceiptImportList from "pages/Dashboards/Receipt/ReceiptImport/ReceiptImportList";

// receipt return
import ReceiptReturnCreate from "pages/Dashboards/Receipt/ReceiptReturn/ReceiptReturnCreate";
import ReceiptReturnUpdate from "pages/Dashboards/Receipt/ReceiptReturn/ReceiptReturnUpdate";
import ReceiptReturnList from "pages/Dashboards/Receipt/ReceiptReturn/ReceiptReturnList";

// receipt check
import ReceiptCheckCreate from "pages/Dashboards/Receipt/ReceiptCheck/ReceiptCheckCreate";
import ReceiptCheckUpdate from "pages/Dashboards/Receipt/ReceiptCheck/ReceiptCheckUpdate";
import ReceiptCheckList from "pages/Dashboards/Receipt/ReceiptCheck/ReceiptCheckList";

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

  // product
  { path: "/products", component: ProductList },

  // receipt import
  { path: "/receipt-import/create", component: ReceiptImportCreate },
  { path: "/receipt-import/update", component: ReceiptImportUpdate },
  { path: "/receipt-import/list", component: ReceiptImportList },

  // receipt return
  { path: "/receipt-return/create", component: ReceiptReturnCreate },
  { path: "/receipt-return/update", component: ReceiptReturnUpdate },
  { path: "/receipt-return/list", component: ReceiptReturnList },

  // receipt check
  { path: "/receipt-check/create", component: ReceiptCheckCreate },
  { path: "/receipt-check/update", component: ReceiptCheckUpdate },
  { path: "/receipt-check/list", component: ReceiptCheckList },

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
