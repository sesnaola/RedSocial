import axios from "axios";

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
  getUsers() {
    return SocialNetwork.get("users");
  },
  // TODO Change mail to email
  login(mail, password) {
    const user = { mail, password };
    return SocialNetwork.post("login", user);
  },
};
