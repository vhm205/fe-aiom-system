import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// login
import LoginReducer from "./auth/login/reducer";

// register
import RegisterReducer from "./auth/register/reducer";

// userProfile
import ProfileReducer from "./auth/profile/reducer";

// User Management Reducer
import UserReducer from "./users/reducer";

// User Management Reducer
import ProductReducer from "./products/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Register: RegisterReducer,
  Profile: ProfileReducer,
  Users: UserReducer,
  Products: ProductReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
