import { loginError, loginSuccess, logoutSuccess } from "./reducer";
import { toast } from "react-toastify";
import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";
import { RootState } from "slices";
import { getFirebaseBackend } from "helpers/firebase_helper";
import { IHttpResponse } from "types";
import { request } from "helpers/axios";

interface User {
  email: string;
  password: string;
}

export const loginUser =
  (
    user: User,
    history: any,
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Dispatch) => {
    try {
      let response: IHttpResponse | any = await request.post("/auth/login", {
        username: user.email,
        password: user.password,
      });
      if (response.statusCode !== 200) {
        return toast.error(response.message);
      }

      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("authUser", JSON.stringify(response.data.user));

      if (response) {
        setTimeout(() => {
          dispatch(loginSuccess(response));
          history("/dashboard");
        }, 500);
      }
    } catch (error) {
      dispatch(loginError(error));
    }
  };

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    localStorage.removeItem("jwt");
    localStorage.removeItem("authUser");

    let fireBaseBackend = await getFirebaseBackend();

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutSuccess(response));
    } else {
      dispatch(logoutSuccess(true));
    }
  } catch (error) {
    dispatch(loginError(error));
  }
};

export const socialLogin =
  (type: any, history: any) => async (dispatch: any) => {
    try {
      let response: any;

      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const fireBaseBackend = getFirebaseBackend();
        response = fireBaseBackend.socialLoginUser(type);
      }

      const socialData = await response;

      if (socialData) {
        sessionStorage.setItem("authUser", JSON.stringify(socialData));
        dispatch(loginSuccess(socialData));
        history("/dashboard");
      }
    } catch (error) {
      dispatch(loginError(error));
    }
  };
