
const moment = require('moment')
const auth = require('../../auth/auth_users');
const db = require('../../db/db_execute')

module.exports ={

    // 내 정보 보기 기능
    getUsersInfo:(req, res, next) => {

        let role = req.query.role;
        let email = req.query.email;
        let name = req.query.name;
        let nickName = req.query.nickName;
        let mobileNumber = req.query.mobileNumber;
        let pw = req.query.pw;
        let activated ;
        let created_at ;

        res.send('222');
    },

    // 회원 가입 기능
    // 전화번호 인증 후 회원가입이 가능해야 합니다.
    signUp:async (req, res, next) => {
        try {

        let id = req.query.id; //식별 가능한 모든 정보
        let role = req.query.role;
        let email = req.query.email; //식별 가능한 모든 정보
        let nickName = req.query.nickName;
        let name = req.query.name; 
        let mobileNumber = req.query.mobileNumber;//식별 가능한 모든 정보
        let ramdom = req.query.ramdom;//식별 가능한 모든 정보
        let pw = req.query.pw;
        let activated = 'Y';
        let created_at = moment().format("YYMMDDHHmmss");

        //벨리데이션 체크 넣으면 되는 부분
        let userState={
            no, id, role, email, nickName, name, mobileNumber, ramdom, pw, activated, created_at
        }
        let table = 'users'; 

        let result2 = auth.signUpExe(userState);
        // let result = await db.create(table, userState);
        
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
    login:(req, res, next) => { 
        try{
            let id = req.query.id; //식별 가능한 모든 정보 
            let email = req.query.email; //식별 가능한 모든 정보
            let mobileNumber = req.query.mobileNumber;//식별 가능한 모든 정보
            let pw = req.query.pw;
            
            jwt();

            res.send('222');
        } catch (err) {
            console.error("login catch error : " + err); //log add
            throw err;
        }
    },


    // 비밀번호 찾기 ( 재설정 ) 기능
    // 로그인 되어 있지 않은 상태에서 비밀번호를 재설정하는 기능입니다.
    // 전화번호 인증 후 비밀번호 재설정이 가능해야 합니다.
    setPwByAuthPhone:(req, res, next) => {
        let no = req.post.a;
        let role = req.post.a;
        let email = req.post.a;
        let name = req.post.a;
        

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
        
        
      
        // 이미 있다면 덮어쓰기됨
        await db.create(`/${tableName}/${mobileNumber}`, result)
        let ress = await db.getData(`/${tableName}/${mobileNumber}`)
        console.log(ress)
        res.send(ress);
    },
}