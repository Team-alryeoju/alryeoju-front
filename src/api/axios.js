import axios from "axios";

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://54.180.81.77:5000';
export default axios

// export default axios.create({
//     baseURL: '/api'
// })