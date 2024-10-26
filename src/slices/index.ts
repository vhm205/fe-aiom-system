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
import UserManagmentReducer from "./userManagement/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Register: RegisterReducer,
  Profile: ProfileReducer,
  UserManagement: UserManagmentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

