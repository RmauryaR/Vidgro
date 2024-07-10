import axios from "axios";
console.log(process.env.REACT_APP_YT_API_KEY);
const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    key: "AIzaSyDhe8PW7scTdBvHnoD_e6KgBv_JLeDzkDY", //my youtube project api
    // key: "AIzaSyCSuf21qRjGhvBnmwwM2EjCNhWzt3ahUxA", // others api
  },
});
export default request;
