import { publicAxiosInstance } from "../Instance/axiosInstance";
import { login, logout } from "../features/userSlice";

export const loginHandler = async (dispatch, userData) => {
  try {
    const { data } = await publicAxiosInstance.post(
      "/api/v1/auth/login",
      userData
    );
    dispatch(login(data));
  } catch (error) {
    alert("username or password wrong");
  }
};

export const logoutHandler = async (dispatch) => {
  try {
    await publicAxiosInstance.post("/api/v1/auth/logout");
    dispatch(logout());
  } catch (error) {
    alert("error occurred");
  }
};

export const PutHandler = async (dispatch, AxiosPrivate, user, userData) => {
  try {
    await AxiosPrivate.put(`/api/v1/users/${user._id}`, userData);
  } catch (error) {
    alert(error);
  }
};

export const SuggestHandler = async (
  userData,
  AxiosPrivate,
  user
) => {
  try {
    const response = await AxiosPrivate.post(
      `/api/v1/destinations/${user._id}`,
      userData
    );
    console.log(response);
  } catch (error) {
    alert("Your Not Logged In, Please Loggin First!");
  }
};
