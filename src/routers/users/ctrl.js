
const { get } = require('express/lib/response');
const moment = require('moment')
const auth = require('../../auth/auth_users');
const db = require('../../db/db_execute')

module.exports ={

    // 내 정보 보기 기능
    getUsersInfo: async(req, res, next) => {
        let tableName = 'users';
        let id = req.query.id;
 
        let result = await db.getData(`/${tableName}/${id}`)
        res.send(result);
    },

    // 회원 가입 기능
    // 전화번호 인증 후 회원가입이 가능해야 합니다.
    signUp: async(req, res, next) => {
        try {

        let id = req.query.id; //식별 가능한 모든 정보 중복 x
        let email = req.query.email; //식별 가능한 모든 정보 중복 x
        let mobileNumber = req.query.mobileNumber;//식별 가능한 모든 정보 중복 x
        let nickName = req.query.nickName;
        let name = req.query.name;
        let random = req.query.random;//받은 난수 사용
        let pw = req.query.pw; 
        let created_at = moment().format("YYMMDDHHmmss");
        let authType = 'signUp'; //모바일 난수인증 할 때 비번 찾기와 회원가입 구분
        // let role = req.query.role; 유저권한 
        // let activated = 'Y'; 유저 활성화 여부

        //벨리데이션 체크
        
        let userState={
            id, email, mobileNumber, nickName, name, random, pw, authType, created_at
        }
     
        let result = await auth.signUpExe(userState);
        // let result = await db.create(table, userState);
        // let rere = await db.getData(`/users`)
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
            let id = req.query.id; //식별 가능한 모든 정보 중복 x
            let email = req.query.email; //식별 가능한 모든 정보 중복 x
            let mobileNumber = req.query.mobileNumber;//식별 가능한 모든 정보 중복 x
            let pw = req.query.pw;
 
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
        let no = req.post.a;
        let role = req.post.a;
        let email = req.post.a;
        let name = req.post.a;
        
        let authData = db.getData(`/auth/${userState.mobileNumber}`)
        let authCheck =false;
        if(userState.random == authData.random &&
            userState.authType == authData.authType &&
            userState.mobileNumber == authData.mobileNumber){
            authCheck = true;
        }

        if(userState.random){
            //맞으면 난수 통과
        }
        await db.create(`/${tableName}/${mobileNumber}`, result)
        
        res.send('222');
    },
    getAuthPhone:async(req, res, next) => {
        let mobileNumber = req.query.mobileNumber;//식별 가능한 모든 정보
        let authType = req.query.authType;//비번찾기 or 회원가입
        let min =10000;
        let max =99999;
        let random = Math.floor(Math.random() * (max - min + 1)) + min; //5자리 난수
        
        let result= {random, authType}
        let tableName = 'auth';
        

        //기존 폰넘버 존재시 업데이트됨
        await db.create(`/${tableName}/${mobileNumber}`, result)
        let ress = await db.getData(`/${tableName}/${mobileNumber}`)
        console.log(ress)
        res.send(ress);
    },
}