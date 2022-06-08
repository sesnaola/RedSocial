import axios from "axios";
import Cookies from "js-cookie";

const SocialNetwork = axios.create({
  // baseURL: "http://localhost:3080/api/v1/",
  baseURL: "http://localhost:3080/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  setUserLogged(userLogged) {
    Cookies.set("userLogged", userLogged);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  deleteUserLogged() {
    Cookies.remove("userLogged");
  },
  // TODO change mail to email
  login(mail, password) {
    const user = {
      mail,
      password,
    };
    return SocialNetwork.post("login", user);
  },
  getUsers() {
    return SocialNetwork.get("users");
  },
};
