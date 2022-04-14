
const moment = require('moment')
const auth = require('../../auth/auth_users');
const db = require('../../db/db_execute')

module.exports ={

    // 내 정보 보기 기능
    // 내정보를 볼땐 로그인 상태여야하기때문에 데이터 받고 jwt 인증하고 실행
    getUsersInfo: async(req, res, next) => {
        let id = req.id;

        let result = await db.getData(`/users/${id}`)
        res.send(result);
    },

    // 회원 가입 기능
    // 전화번호 인증 후 회원가입이 가능해야 합니다.
    signUp: async(req, res, next) => {
        try {

        let id = req.body.id; //식별 가능한 모든 정보 중복 x
        let email = req.body.email; //식별 가능한 모든 정보 중복 x
        let mobileNumber = req.body.mobileNumber;//식별 가능한 모든 정보 중복 x
        let nickName = req.body.nickName;
        let name = req.body.name;
        let random = req.body.random;//받은 난수 사용
        let pw = req.body.pw;  // 단방향 암호화 해주면 좋음
        let created_at = moment().format("YYMMDDHHmmss");
        let authType = 'signUp'; //모바일 난수인증 할 때 비번 찾기와 회원가입 구분
        // let role = req.query.role; 유저권한 
        // let activated = 'Y'; 유저 활성화 여부

        //벨리데이션 체크
        
        let userState={
            id, email, mobileNumber, nickName, name, random, pw, authType, created_at
        }

        //난수 체크
        let randomAuthCheck = await auth.randomAuth(userState);
        if(!randomAuthCheck){
            throw new Error('This is the wrong auth number');
        }

        // //식별 가능한 모든 정보 중복 체크
        let signCheck = await auth.signUpExe(userState);
        if(!signCheck){
            throw new Error('signUpExe error');
        }

        await db.create(`/users/${userState.id}`, userState) 
        let result = await db.getData(`/users/${userState.id}`) 
        res.send(result);

        // return res;
        } catch (err) {
            console.error("signUp catch error : " + err); //log add
            throw err;
        }
    },

    // 로그인 기능
    // 식별 가능한 모든 정보로 로그인이 가능해야 합니다.
    // 식별 가능한 모든 정보가 무엇인지는 스스로 판단하여 결정하시면 됩니다.
    // 예) 아이디 혹은 전화번호 + 비밀번호를 입력하면 로그인이 가능합니다.
    login:async (req, res, next) => { 
        try{
            let id = req.body.id; //식별 가능한 모든 정보 중복 x
            let email = req.body.email; //식별 가능한 모든 정보 중복 x
            let mobileNumber = req.body.mobileNumber;//식별 가능한 모든 정보 중복 x
            let pw = req.body.pw;
 
            let userState={
                id, email, mobileNumber, pw
            }

            let result = await auth.loginExe(userState);

            res.send(result);
        } catch (err) {
            console.error("login catch error : " + err); //log add
            throw err;
        }
    },

    // 비밀번호 찾기 ( 재설정 ) 기능
    // 로그인 되어 있지 않은 상태에서 비밀번호를 재설정하는 기능입니다.
    // 전화번호 인증 후 비밀번호 재설정이 가능해야 합니다.
    setUserPw:async(req, res, next) => {

        let id = req.body.id;
        let newPw = req.body.newPw;
        let random = req.body.random;
        let authType = req.body.authType;
        let mobileNumber = req.body.mobileNumber;

        let userState={
            id, random, authType, mobileNumber
        }

        //난수 체크 
        let randomAuthCheck = await auth.randomAuth(userState);
        if(!randomAuthCheck){
            throw new Error('This is the wrong auth number');
        }
        let result = await db.getData(`/users/${id}`)
        //새 비밀번호 입력
        result['pw'] = newPw;
        await db.create(`/users/${id}`, result)
        
        res.send(id);
    },
    getAuthPhone:async(req, res, next) => {
        let mobileNumber = req.body.mobileNumber;//식별 가능한 모든 정보
        let authType = req.body.authType;//비번찾기 or 회원가입
        let min = 10000;
        let max = 99999;
        let random = Math.floor(Math.random() * (max - min + 1)) + min; //5자리 난수
        
        let authState= {random, authType} 

        //기존 폰넘버 존재시 업데이트됨
        await db.create(`/auth/${mobileNumber}`, authState)
        let result = await db.getData(`/auth/${mobileNumber}`)
        result ={
            ...result,
            mobileNumber
        };
        res.send(result);
    },
}