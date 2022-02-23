import axios from "axios";

export default axios.create({
  baseURL: "localhost/pred",
  headers: {
    "Content-type": "application/json"
  }
});