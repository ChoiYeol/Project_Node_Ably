# Project_Node_Ably
Ably 백엔드 과제
회원 가입 및 비밀번호 재설정이 가능한 API를 제작합니다. 
클린코드를 생각하며 디렉토리나 객체의 구분을 기능별로 나누었습니다.
모든 요구사항은 최종구현 완료되었습니다.


#사용 기술 및 환경
환경: Node.js
server: express
db: node-json-db
auth: jsonwebtoken

api_test : postman

#실행방법
1. 알집 해제 or git clone
2. npm install
3. npm run server

#기능 요구사항 설명 및 실행 순서

1. 회원가입 기능
전화번호 인증 API를 사용해 난수를 생성합니다. 모바일에 보내는 대신
API 반환 값에 난수를 포함합니다.
난수를 포함한 회원가입 정보를 넣어줍니다.

- 전화번호 인증을 먼저 API를 통해 진행합니다. 
http://localhost:54001/api/users/getAuthPhone
예시 데이터)
{
    "mobileNumber":"01088150799",
    "authType":"signUp"
}
- 회원가입을 위한 정보 및 인증 API에서 받아온 값을 넣어줍니다.
http://localhost:54001/api/users/signUp
예시 데이터)
{
    "id":"qlqjs674",
    "email":"qlqjs674@naver.com",
    "mobileNumber":"01088150799",
    "nickName":"Ten",
    "name":"최열",
    "random":"75146",
    "pw":"0814",
    "authType":"signUp"
}

2. 로그인 기능
- 회원가입한 정보중 id, email, mobileNumber 중 하나의 값을 넣어줍니다.

http://localhost:54001/api/users/login
예시 데이터)
{
    "mobileNumber": "01088150799",
    "pw":"0814"
}

3. 내 정보보기 기능
설명 - 내 정보는 로그인이 된다음 볼수있다고 가정했습니다.
express middleware 처리로 jwt 인증을 확인합니다.

실행
- 로그인 시에 리턴되는 jwt token을 헤더에 넣어줍니다.
- id 값을 넣어 json에 넣어 호출합니다. 
key - Authorization , value - token 값
http://localhost:54001/api/users/getUsersInfo
예시 데이터)
{
    "id":"qlqjs674"
}

4. 비밀번호 찾기(재설정) 기능
- 앞서 만들어준 회원의 전화번호인증 을 먼저합니다. 
http://localhost:54001/api/users/getAuthPhone
{
    "mobileNumber":"01088150799",
    "authType":"setPw"
}    

- id, 새비밀번호, 난수, 인증 타입, 번호를 넣어 비밀번호를 변경해줍니다.
http://localhost:54001/api/users/setUserPw
{
    "id":"qlqjs674",
    "newPw":"0000",
    "random": 31176,
    "authType": "setPw",
    "mobileNumber": "01088150799"
}
 


