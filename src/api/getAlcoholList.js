import axios from "./axios";


export async function getAlcohol(filterBy = '') {
    // API URL : '/random?category=???' 이런 식으로 query를 던져 데이터를 가져온다.
    
    // 필터 조건이 들어오는 filterBy 객체에는 catergory(술 종류) 속성이 지정되어 있다. 
    // 술 종류에 따라 list를 axios 이용해서 가져온다.

    let url = ''

    // sool List URL is random
    if(filterBy === ''){
        url = `/random`
    }else{
        url = `/random?category=${filterBy}`
    }

    return new Promise((resolve) => {
        const result = fetch(url).then((response) => response.json())
        resolve(result)
    })

     // 처음 loading 때 한 번 전체 술 리스트를 가져온다.
        // const fetchAlList = async () =>{
        //     try {
        //         // 요청이 시작 할 때에는 error와 alList 초기화
        //         setError(null);
        //         setAlList([]);

        //         // loading 상태를 true 로 바꿉니다.
        //         setLoading(true);

        //         // fetch -> 술 전체를 random 하게 저장한 리스트 api url = '/random'
        //         const response = await axios.get("/random");
        //         // 데이터는 response.data 안에
        //         setAlList(response.data);
        //       } catch (e) {
        //         // error
        //         setError(e);
        //       }
        //       // 모든 작업을 완료했으므로 loading 상태를 true로 바꿈
        //       setLoading(false);
        //       showAlList = alList.slice();
        // }
        
        // // fetch!
        // fetchAlList();


}