import axios from "axios";

export default axios.create({
  baseURL: "URL 주소입력하세요",
  headers: {
    "Content-type": "application/json"
  }
});