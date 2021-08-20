import axios from "axios";

const api = axios.create({
  baseURL: "https://aipsi.herokuapp.com/"
});

export default api;