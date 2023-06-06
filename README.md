<div align="center">
  
![header](https://capsule-render.vercel.app/api?type=transparent&text=알려주(Alryeoju)&animation=fadeIn&fontColor=7d6767&color=7d6767&height=100)
  
</div>

## 🍶 프로젝트 설명

> 사용자의 취향을 기반으로 전통주를 추천하는 웹 서비스 </br>

사용자 별 전통주의 **선호도를 예측하고 Top N개의 전통주를 추천**하는 머신 러닝 프로젝트이며, </br> 
사용자가 직접 **취향 테스트, 리뷰 작성 등의 기능을 체험**하고 이를 통해 직관적으로 추천 결과를 확인할 수 있도록 </br>
**온라인 쇼핑몰 형태의 웹 애플리케이션**으로 개발였습니다.

</br>

## 🗓️ 프로젝트 기간
- 전체 프로젝트 기간 : 2022.03 → 2022.11
- 웹 애플리케이션 개발 : 2022.10 → 2022.11 (4주)

</br>

## 🔗 배포 링크
https://alryeoju.netlify.app
</br> ( 현재 서버는 중단된 상태입니다 )

</br>

## 🛠️ 기술 스택
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white">
</br>
<img src="https://img.shields.io/badge/styledcomponents-DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white">
<img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white">
<img src="https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">
</br>
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
</br>

## 🌟 주요 기능
### 1️⃣ 로그인 & 회원가입 기능
사용자 별로 전통주의 평가(리뷰) 데이터를 저장하기 위해 회원가입 기능을 구현하였습니다.
- JWT 인증 방식 적용하여 인증 정보를 클라이언트에서 관리
- Context API 사용하여 로그인 여부, 로그인한 유저 정보 전역 관리
  

### 2️⃣ 메인 페이지
상단에 추천 시스템으로 추출된 사용자별로 선호도가 높은 Top 15개의 전통주를 보여줍니다.
</br> 하단에서는 주종별로 모든 전통주 목록을 확인할 수 있습니다.
- 사용자별 Top 15 전통주 추천 캐러셀 UI 구현
    - 상품 상세 페이지, 취향 테스트 결과 화면에서도 재사용 가능하도록 구현
- 전체 전통주 목록 주종 별로 필터링 기능 구현
    

### 3️⃣ 사용자 취향 검사 기능
회원가입 없이도 전통주를 추천받을 수 있도록 5개의 키워드 질문을 통해 취향 테스트를 구현하였습니다.
- 문제에 대한 답변들을 API 요청 시 query parameter 에 포함
- 문제의 유형, 옵션의 개수 등에 따라 유동적으로 동작하도록 컴포넌트의 확장성을 높여 구현
    

### 4️⃣ 상품 상세 페이지, 구매 내역 페이지
상품별로 상세 정보, 평균 평점, 리뷰, 주요 키워드, 유사 전통주 정보를 보여줍니다.
</br> 실제 구매 기능은 없지만 구매 버튼 클릭 시 구매 내역에 추가되어 리뷰와 평점을 남길 수 있습니다.
- 구매 상품 평점, 리뷰 작성 기능 구현
    

### 5️⃣ 반응형 페이지 구현
모바일에서도 모든 기능을 사용할 수 있습니다.
- CSS 미디어 쿼리를 이용한 반응형 페이지 구현
    - 다양한 모바일 환경에서의 접근성 향상

|로그인|회원가입|
|--------------------|--------------------|
|<img width="300" alt="로그인" src="https://github.com/Team-alryeoju/alryeoju-front/assets/52372820/0fdaa1e1-d59f-4abd-b3d9-d8074654c2b4">|<img width="300" alt="회원가입" src="https://github.com/Team-alryeoju/alryeoju-front/assets/52372820/d7719130-2496-4133-9d7f-942bfdf9dc28">|<img width="300" alt="메인페이지" src="https://github.com/Team-alryeoju/alryeoju-front/assets/52372820/61ed7fe9-2515-43d3-ab83-0b67fafbaff1">|

|메인페이지|취향 테스트|취향 테스트 결과|
|--------------------|--------------------|--------------------|
|<img width="300" alt="메인페이지" src="https://github.com/Team-alryeoju/alryeoju-front/assets/52372820/61ed7fe9-2515-43d3-ab83-0b67fafbaff1">|<img width="300" alt="취향 테스트" src="https://github.com/Team-alryeoju/alryeoju-front/assets/52372820/3c9e6c6f-4c5f-4723-9cc0-dd6e27f966bc">|<img width="300" alt="취향 테스트 결과" src="https://github.com/Team-alryeoju/alryeoju-front/assets/52372820/13437414-554e-44f0-b8de-a5416272a393">

|제품 상세 페이지|리뷰 모달|
|--------------------|--------------------|
|<img width="300" alt="상세 페이지" src="https://github.com/Team-alryeoju/alryeoju-front/assets/52372820/9a05f523-ad94-4426-847b-45f3c8a3f8f1">|<img width="300" alt="리뷰" src="https://github.com/Team-alryeoju/alryeoju-front/assets/52372820/370ab38f-300a-4912-b1e6-af61e56e48c9">|
