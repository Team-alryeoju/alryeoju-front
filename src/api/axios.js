import axios from "axios";

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: 'http://127.0.0.1:5000'
})