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
  login(email, password) {
    const user = { email, password };
    return axios.post("login", user);
    //return SocialNetwork.post("login", user);
    //return SocialNetwork.get("users/1");
  },
};
