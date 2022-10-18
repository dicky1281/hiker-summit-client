import { publicAxiosInstance } from "../Instance/axiosInstance";
import { lastName, login, logout, name, phone, updateProfilePicture, username } from "../features/userSlice";

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
    dispatch(name(userData.first_name))
    dispatch(lastName(userData.last_name))
    dispatch(phone(userData.phone_number))
    dispatch(username(userData.username))
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

export const updateImage = async (dispatch, AxiosPrivate, user_id, data) => {
  try {
    const res = await AxiosPrivate.put( `/api/v1/users/profile_picture/${user_id}`, data)
    dispatch(updateProfilePicture(res.data.result))
  } catch (error) {
    alert("Gagal Mengganti Gambar")
  }
}

export const getUserData = async (AxiosPrivate, user_id) => {
  try {
     await  AxiosPrivate.get(`/api/v1/users/${user_id}`)
  } catch (error) {
    alert("Gagal Mengambil Data")
    
  }
}

export const sendEmailVerify = async (AxiosPrivate, user_id) => {
  try {
    await AxiosPrivate.post(`/api/v1/confirmation/${user_id}`)
    alert(
      "Silahkan Lakukan Konfirmasi Melalui Email Yang Telah Kirimkan, dan coba untuk login kembali"
    );
  } catch (error) {
    alert("Terjadi Kesalahan");
  }
}
