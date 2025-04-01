import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// login
import LoginReducer from "./auth/login/reducer";

// register
import RegisterReducer from "./auth/register/reducer";

// userProfile
import ProfileReducer from "./auth/profile/reducer";

// User Reducer
import UserReducer from "./users/reducer";

// Product Reducer
import ProductReducer from "./products/reducer";

// Receipt Reducer
import ReceiptImportReducer from "./receipt-import/reducer";
import ReceiptReturnReducer from "./receipt-return/reducer";
import ReceiptCheckReducer from "./receipt-check/reducer";

// Supplier Reducer
import SupplierReducer from "./supplier/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Register: RegisterReducer,
  Profile: ProfileReducer,
  Users: UserReducer,
  Products: ProductReducer,
  ReceiptImport: ReceiptImportReducer,
  ReceiptReturn: ReceiptReturnReducer,
  ReceiptCheck: ReceiptCheckReducer,
  Supplier: SupplierReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
