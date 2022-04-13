require("dotenv").config();

 
const jwt = require('jsonwebtoken');
const app_secret = process.env.APP_SECRET ;
 
 
const SECURITY_MANAGER_UGR = ["UGR001001", "UGR002001"];



const db = require('../db/db_execute')
// UserId SecurityManager 권한

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
            
            //모바일 난수 인증 
            let authMobile = await db.getData(`/auth/${userState.mobileNumber}`)
            let authMobileCheck = false;
            if(authMobile){
                if(userState.random == authMobile.random&&
                    userState.authType == authMobile.authType){
                        authMobileCheck = true;
                }
            }else{
                throw new Error('This auth number does not exist');
            }
            if(!authMobileCheck){
                throw new Error('This is the wrong auth number');
            }

            await db.create(`/users/${userState.id}`, userState)
            
            return userState.id


        } catch (err) {
            console.error("signUpExe error is " + err) // 로그
            throw new Error(err);
        }
 

    },

    // loginExe: async function(parent, args, context, info) {
    loginExe: async function (userState) {
        let accessId ;

        try {
            let userExistCheck = await db.getData(`/users`)
            
            if(userExistCheck){
                for( key in userExistCheck){
                    if(userState.id == userExistCheck[key].id){
                        accessId = userState.id
                        break;
                    }
                    if(userState.email == userExistCheck[key].email){
                        accessId = userState.id
                        break;
                    }
                    if(userState.mobileNumber == userExistCheck[key].mobileNumber){
                        accessId = userState.id
                        break;
                    }
                }
            }

            let userPwCheck = await db.getData(`/users/${accessId}`)

            if(userState.pw == userPwCheck.pw){
                //비번 확인 
            }


        } catch (err) {
            console.error("loginExe error is " + err);
            throw new Error(err);
        }

        const token = jwt.sign({
            userId: accessId,
        }, app_secret, {
            expiresIn: '1d'
        });

        return {
            token,
            id:userState.id
        }
    },

 
};