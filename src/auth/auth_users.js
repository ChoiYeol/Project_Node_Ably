require("dotenv").config();

const jwt = require('jsonwebtoken');
const app_secret = process.env.APP_SECRET ;
const db = require('../db/db_execute')


module.exports = {

    //회원가입
    signUpExe: async function (userState) {
        try {
            console.log("signUpExe start.") // 로그
          
            // 식별 가능한 모든 정보 중복 체크
            let userExistCheck = await db.getData(`/users`)
           
            if(userExistCheck){
                for( key in userExistCheck){
                    if(userState.id == userExistCheck[key].id){
                        throw new Error('this id already exists');
                        
                    }
                    if(userState.email == userExistCheck[key].email){
                        throw new Error('this email already exists');
                    }
                    if(userState.mobileNumber == userExistCheck[key].mobileNumber){
                        throw new Error('this mobile Number already exists');
                    }
                }
            }
            
            return true;

        } catch (err) {
            console.error("signUpExe error is " + err) // 로그
            return false;
            // throw new Error(err);
        }

    },

    // loginExe: async function(parent, args, context, info) {
    loginExe: async function (userState) {
        let accessId ;

        try {
            let userExistCheck = await db.getData(`/users`)
            
            //식별 가능 정보 로그인 체크
            if(userExistCheck){
                for( key in userExistCheck){
                    if(userState.id == userExistCheck[key].id){
                        accessId = key
                        break;
                    }
                    if(userState.email == userExistCheck[key].email){
                        accessId = key
                        break;
                    }
                    if(userState.mobileNumber == userExistCheck[key].mobileNumber){
                        accessId = key
                        break;
                    }
                }
                if(!accessId)throw new Error('This user does not exist');
            }

            //pw 체크
            let userPwCheck = await db.getData(`/users/${accessId}`)
            if(userState.pw != userPwCheck. pw){
                throw new Error('This is the wrong password');
            }


        } catch (err) {
            console.error("loginExe error is " + err);
            throw new Error(err);
        }

        const token = jwt.sign({
            id: accessId,
        }, app_secret, {
            expiresIn: '1d'
        });

        return {
            token,
            id:accessId
        }
    },
    randomAuth: async function (userState) {
        try {
            //모바일 난수 인증 
            let authMobile = await db.getData(`/auth/${userState.mobileNumber}`)
            let authMobileCheck = false;
            if(authMobile){
                if(userState.random == authMobile.random&&
                    userState.authType == authMobile.authType){
                        authMobileCheck = true;
                }
            }else{
                return false;
                // throw new Error('This auth number does not exist');
            }
            return true
            // if(!authMobileCheck){
            //     throw new Error('This is the wrong auth number');
            // }
        }catch (err) {
            console.error("getAuth: " + err);
            throw err;
        }
    },
    getJwtAuth: async function (req, res, next) {
        try {
            const Authorization = req.header('Authorization');

            if (!Authorization) throw new Error('Please Sign in.'); 
            const token = Authorization.replace('Bearer ', '');
            const decoded = jwt.verify(token, app_secret);

            if(decoded){
                req.id = decoded.id;
                next();
            }else{
                res.status(401).send()
            }
        }catch (err) {
            console.error("getJwtAuth: " + err);
            throw err;
        }
    },
};