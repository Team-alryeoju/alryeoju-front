export default async (accessToken) => {
    try{
        const res = await axios.get('/user_info',{
            headers: {
                // 헤더에 토큰 추가!
                Authorization: `Bearer ${accessToken}`,
            }
        })

        return

    }catch(err) {
        console.log(err)
    }
}