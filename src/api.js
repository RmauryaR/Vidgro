import axios from "axios";
console.log(process.env.REACT_APP_YT_API_KEY);
const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    // key: "AIzaSyAv-WyCV2fB9PaG8_yMpS7sSNarpDCe5tU", //vidgro
    key: "AIzaSyDhe8PW7scTdBvHnoD_e6KgBv_JLeDzkDY", //my-rgm youtube project api
    // key: "AIzaSyAswJhQ4NsZ0HyCj8Wkr40vxUHX5-fDrmU", // others api
  },
});
export default request;
