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
    Cookies.set("userLogged", { token, userId });
  },
  getUserLogged() {
    return Cookies.get("userLogged");
  },
  deleteUserLogged() {
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
