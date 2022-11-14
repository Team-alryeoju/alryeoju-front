import axios from "./axios.js";


const accessToken = JSON.parse(sessionStorage.getItem("access_token"))

const test = () => {
    console.log('Hi! This is API')
}

/** GET 요청 */
// User 정보 가져오기
const userInfo = () => {
    return axios.get('/user_info',{
        headers: {
            // 헤더에 토큰 추가!
            Authorization: `Bearer ${accessToken}`,
        }
    })
}

// 1. Home 페이지
const getSoolRank = () => {
    // accessToken이 존재한다면
    // user 정보에 맞는 술 추천 랭킹
    if(accessToken){
        return axios.get('/recomm_user',{
            headers: {
                // 헤더에 토큰 추가!
                Authorization: `Bearer ${accessToken}`,
            }
        })
    // 아니면 일반 베스트 랭킹 가져오기
    }else{
        return axios.get('/recomm')
    }
}

// 2. Detail 페이지
/** /detail_user
 * 로그인 정보가 존재하면 access token 같이 요청하여
 * 유저에 맞는 토큰 랭킹이 포함된 술 정보를 가져온다.
 * 
 * /detail
 * 로그인 정보가 존재하지 않으면 
 * 기본 정보를 가져온다.
*/
const getSoolDetail = (soolId) => {
    // accessToken이 존재한다면
    // user 정보에 해당하는 술 detail 가져오기
    if(accessToken){
        return axios.get('/detail_user',{
            params: { al_id: soolId },
            headers: {
                // 헤더에 토큰 추가!
                Authorization: `Bearer ${accessToken}`,
            }
        })
    // 아니면 일반 정보 가져오기
    }else{
        return axios.get('/detail',{
            params: { al_id: soolId }
        })
    }
}

/** Detail 페이지 - 술의 비슷한 술 정보 */
const getSimilarSool = (sooId) => {
    return axios.get('/simitems', {
        params: {al_id: sooId}
    })
}

/** 구매하기 */
const purchase = (soolId) => {
    return axios.post("/purchase",
        JSON.stringify({al_id : soolId}),
        {
            headers: { 
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }  
    );
}

/** 구매 내역 */
const getPurchasedItems = () => {
    return axios.get(`/purchased_items`, 
        {
            headers: { 
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
}

export{
    test, 
    userInfo, 
    getSoolRank, 
    getSoolDetail, 
    getSimilarSool, 
    purchase,
    getPurchasedItems
}