import { loginError, loginSuccess, logoutSuccess } from "./reducer";
import { ThunkAction } from "redux-thunk";
import { Action, Dispatch } from "redux";
import { RootState } from "slices";
import { IHttpResponse } from "types";
import { request } from "helpers/axios";

interface User {
  username: string;
  password: string;
}

export const loginUser =
  (
    payload: User,
    history: any
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Dispatch) => {
    try {
      let response: IHttpResponse | any = await request.post("/auth/login", {
        username: payload.username,
        password: payload.password,
      });

      if (response.statusCode !== 200 || !response.data) {
        dispatch(loginError(response.message));
        return;
      }

      const { token, user } = response.data;

      localStorage.setItem("jwt", token);
      localStorage.setItem("authUser", JSON.stringify(user));

      setTimeout(() => {
        dispatch(loginSuccess(user));
        history("/products");
      }, 500);
    } catch (error) {
      dispatch(loginError((error as Error).message));
    }
  };

export const logoutUser = () => async (dispatch: Dispatch) => {
  try {
    await request.post("/auth/logout");

    localStorage.removeItem("jwt");
    localStorage.removeItem("authUser");

    dispatch(logoutSuccess(true))
    window.location.href = "/login";
  } catch (error) {
    dispatch(loginError(error));
  }
};
