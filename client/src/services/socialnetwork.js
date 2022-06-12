import axios from "axios";
import Cookies from "js-cookie";

const SocialNetwork = axios.create({
  baseURL: "http://localhost:3080/api/v1",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  setUserLogged(token, userId) {
    Cookies.set("userToken", token);
    Cookies.set("userLogged", userId);
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  getUserToken() {
    return Cookies.get("userToken");
  },
  deleteUserLogged() {
    Cookies.remove("userToken");
    Cookies.remove("userLogged");
  },
  login(mail, password) {
    const user = {
      mail,
      password,
    };
    return SocialNetwork.post("/login", user);
  },
  getUsers() {
    return SocialNetwork.get("/users");
  },
  getUser(userId) {
    return SocialNetwork.get(`/users?userId=${userId}`);
  },
  register(name, surname, mail, password) {
    const users = {
      name,
      surname,
      mail,
      password,
    };
    return SocialNetwork.post("users", users);
  },
  getPosts() {
    return SocialNetwork.get("/posts");
  },
};
