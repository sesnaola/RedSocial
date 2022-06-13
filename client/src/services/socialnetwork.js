import axios from "axios";
import Cookies from "js-cookie";

const SocialNetwork = axios.create({
  baseURL: "http://localhost:3080/api/v1",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${Cookies.get("userToken")}`,
  },
});

export default {
  setUserLogged(token, userId) {
    Cookies.set("userToken", token);
    Cookies.set("userLogged", userId);
  },
  getUserLogged() {
    // Get user logged from store
    return Cookies.get("userLogged");
  },
  getUserToken() {
    return Cookies.get("userToken");
  },
  logout() {
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
    // return SocialNetwork.get(`/users?userId=${userId}`);
    return SocialNetwork.get(`/users/${userId}`);
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
  publicar(userId, text, fd) {
    fd.set("userId", userId);
    fd.set("text", text);
    return SocialNetwork.post("/posts", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getPosts() {
    return SocialNetwork.get("/posts");
  },
};
