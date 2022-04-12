 
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const APP_SECRET = 'GraphQL-is-aw3some';

// const sql = require('../db/db_exe');
// const search = require('../search/search');
// const seed_pw = require('../devicesPW/seed');
// const moment = require("moment");
// const rpa = require('../RPA/rpaProcess');
// const db = require('../db/db_create');
// const plain_pw = require("../devicesPW/plain_pw");
// const logger = require('../Logger/winston');
// const log = (msg) => logger.info(msg);

// // require('events').defaultMaxListeners = 15;
// process.setMaxListeners(20);

const db = require('../db/db_execute')
 

// UserId SecurityManager 권한
const SECURITY_MANAGER_UGR = ["UGR001001", "UGR002001"];

module.exports = {
    // signUpExe: async function(parent, args, context, info) {
    signUpExe: async function (userState) {
        try {
            console.log("signUpExe start.")
            let users = db.getData('users')
            // let id = req.query.id; //식별 가능한 모든 정보
            // let email = req.query.email; //식별 가능한 모든 정보
            // let mobileNumber = req.query.mobileNumber;//식별 가능한 모든 정보
            
            let authData = db.getData(`/auth/${userState.mobileNumber}`)
            let authCheck =false;
            if(userState.random == authData.random &&
                userState.authType == authData.authType &&
                userState.mobileNumber == authData.mobileNumber){
                authCheck = true;
            }

            if(!authCheck)return false
            
            //넣게 되면pw는 단방향 암호화 넣으면 되는 부분
            
            if(userState.random){
                //맞으면 난수 통과
            }
            // return msg

        } catch (err) {
            // console.error("signUpExe error is " + err);
            // logger.error("signUpExe error is " + err);
            throw new Error(err);
        }
 

    },

    // loginExe: async function(parent, args, context, info) {
    // loginExe: async function (Id, PW) {
    //     // 1
    //     // console.log(args.email);
    //     // for(let i=0; i<usersData.length; i++) {
    //     //     console.log("user id: "+usersData[i].id+", email: "+ usersData[i].email+", password: "+usersData[i].password);
    //     // }
    //     let user;
    //     try {
    //         const results = await sql.getUserByIdExe(Id);
    //         if (!results) {
    //             throw new Error('No such user found');
    //         }

    //         user = results.shift(); // user element extracting from results object.
    //     } catch (err) {
    //         console.error("loginExe error is " + err);
    //         throw new Error(err);
    //     }


    //     // 2
    //     try {
    //         const valid = await bcrypt.compare(PW, user.PW);
    //         if (!valid) {
    //             throw new Error('Invalid password');
    //         }
    //     } catch (err) {
    //         console.error("loginExe error is " + err);
    //         throw new Error(err);
    //     }

    //     const resultsSearch = await search.searchPagingExe("ObjectMaps", {
    //         Users_Id: Id
    //     });

    //     let NetGroupArray = [];
    //     resultsSearch.resultsList.map(function (v, i) {
    //         NetGroupArray = [...NetGroupArray, v.CodeId1];
    //     });

    //     console.log("NetGroupArray:" + NetGroupArray);

    //     const token = jwt.sign({
    //         userId: Id,
    //         userGroup: [user.GroupId],
    //         NetGroup: NetGroupArray
    //     }, APP_SECRET, {
    //         expiresIn: '1d'
    //     });

    //     // 3
    //     // console.log("user in loginExe : "+ JSON.stringify(user));
    //     // let user = user.shift();
    //     // console.log("not array user in loginExe : "+ JSON.stringify(singleUser));

    //     return {
    //         token,
    //         user
    //     }
    // },


    // 내부로직에서 user가 avtive 상태인지 check하는 함수.
    // called by exportPWUpdateToRpaJobQueue
    // return true or false
    // checkUserActive: async function (userId) {
    //     try {
    //         const results = await sql.getUserByIdExe(userId);
    //         if (!results.length) {
    //             return false;
    //         }

    //         const user = results.shift(); // user element extracting from results object.

    //         // 3. check if IdInactive
    //         if (user.IdInactive) return false;

    //         // 4. check if IdForever or active period
    //         if (!user.IdForever) {
    //             const startDate = new Date(user.IdRestrictStart);
    //             const endDate = new Date(user.IdRestrictEnd);

    //             const result = moment().isAfter(startDate) && moment().isBefore(endDate);
    //             if (!result) {
    //                 return false;
    //             };
    //         }
    //         return true;

    //     } catch (err) {
    //         console.error("checkUserActive: " + err);
    //         throw err;
    //     }
    // },

    // loginExe: async function (
    //     conn,
    //     CorpId,
    //     Id,
    //     PW
    // ) {
    //     const CONTINUOUSFAILCOUNT_LIMIT = 5;
    //     let myEvent1;

    //     try {
    //         log("loginExe start.")
    //         // 1. check if Id exists.
    //         let user;

    //         const queryString =
    //             "select * from Users " +
    //             " where CorpId = " + conn.escape(CorpId) +
    //             " and Id = " + conn.escape(Id);
    //         // const queryString =
    //         //     "select b.* from userstocorps a, users b " +
    //         //     " where a.UserId = b.Id " +
    //         //     " and a.CorpId = " + conn.escape(CorpId) +
    //         //     " and a.UserId = " + conn.escape(Id);

    //         const results = await db.exeTransaction(conn, queryString);
    //         if (!results.length) {
    //             throw new Error('No such user Id or Corp Id found');
    //             // myEvent1 = new Error('No such user Id or Corp Id found');
    //             // throw myEvent1;
    //         }
    //         console.log("results: " + JSON.stringify(results));

    //         // const results = await sql.getUserByIdExe(Id);
    //         // if (!results.length) {
    //         //     throw new Error('No such user found');
    //         // }

    //         user = results.shift(); // user element extracting from results object.

    //         // console.log("user: " + JSON.stringify(user));
    //         // console.log("user.PW: " + user.PW + ", user.KeyPW: " + user.KeyPW);



    //         // 2. check if PW is the same with one in the DB
    //         // const valid = await bcrypt.compare(PW, user.PW);
    //         if (user.PW != await plain_pw.encryptUserPW(PW)) {
    //             throw new Error('Invalid password');
    //         }


    //         // 3. check if IdInactive
    //         if (user.IdInactive) throw new Error('Id Inactive');


    //         // 4. check if IdForever or active period
    //         if (!user.IdForever) {
    //             const startDate = new Date(user.IdRestrictStart);
    //             const endDate = new Date(user.IdRestrictEnd);

    //             const result = moment().isAfter(startDate) && moment().isBefore(endDate);
    //             if (!result) {
    //                 throw new Error('Id is not in usable period');
    //             };
    //         }

    //         // 5. PW가 생성된 이후 6개월이후면 PW 강제변경
    //         const diffMonth = moment().diff(user.PWCreatedDate, 'month');
    //         console.log("diffMonth:" + diffMonth);
    //         if (diffMonth >= 6) throw new Error('Your PW is over 6 Months. You must update PW');

    //         // 6. MustPWUpdate 확인. 반드시 ContinuousFailCount보다 먼저 확인할 것.
    //         if (user.MustPWUpdate)
    //             throw new Error('MustPWUpdate. You must update PW');

    //         // 7. ContinuousFailCount 확인
    //         if (user.ContinuousFailCount >= CONTINUOUSFAILCOUNT_LIMIT)
    //             throw new Error('Continuous Fail Count is over ' + CONTINUOUSFAILCOUNT_LIMIT +
    //                 '. Contact Administrator please');


    //         // 모든 검사 통과. 사용자권한 get
    //         const resultsUsersToCodes = await sql.getUsersToCodesByIdExe([CorpId], [Id], conn);
    //         // console.log("resultsUsersToCodes:" + JSON.stringify(resultsUsersToCodes));

    //         let NetGroupArray = [],
    //             UserGroupArray = [];
    //         resultsUsersToCodes.map(function (v, i) {
    //             if (v.CodeId.indexOf("NET") > -1)
    //                 NetGroupArray = [...NetGroupArray, v.CodeId];
    //             if (v.CodeId.indexOf("UGR") > -1)
    //                 UserGroupArray = [...UserGroupArray, v.CodeId];
    //         });

    //         // console.log("NetGroupArray:" + NetGroupArray + "UserGroupArray:" + UserGroupArray);

    //         // token 발행
    //         const token = jwt.sign({
    //             CorpId: CorpId,
    //             userId: Id,
    //             // userGroup: [user.GroupId],
    //             userGroup: UserGroupArray,
    //             NetGroup: NetGroupArray
    //         }, APP_SECRET, {
    //             expiresIn: '1d'
    //         });

    //         // 3
    //         // console.log("user in loginExe : "+ JSON.stringify(user));
    //         // let user = user.shift();
    //         // console.log("not array user in loginExe : "+ JSON.stringify(singleUser));


    //         // // rpaStatus update
    //         // if (Id.indexOf("RPA", 0) != -1) {
    //         //     await rpa.updateRpaStatus(Id, "Start");
    //         // }

    //         await this.updateUserContinuousFailCount(conn, CorpId, Id, "OK");
    //         return {
    //             token,
    //             user
    //         }
    //     } catch (err) {
    //         await this.updateUserContinuousFailCount(conn, CorpId, Id, "Error");

    //         // console.error("loginExe: " + err);
    //         console.error("loginExe: " + err);
    //         logger.error("loginExe: " + err);

    //         throw err;
    //     } finally {
    //         // process.removeListener(myEvent1);
    //         // console.log("removeListener(myEvent1");
    //     }
    // },

    // updateUserContinuousFailCount: async function (
    //     conn,
    //     CorpId,
    //     Id,
    //     Status
    // ) {
    //     try {
    //         log(`updateUserContinuousFailCount start.`)
    //         if (Status == "OK") {
    //             const queryString =
    //                 "update users set ContinuousFailCount=0 " +
    //                 " where Id = " + conn.escape(Id) +
    //                 " and CorpId = " + conn.escape(CorpId);
    //             const results = await db.exeTransaction(conn, queryString);
    
    //         } else if (Status == "Error") {
    //             const queryString =
    //                 "update users set ContinuousFailCount=ContinuousFailCount+1 " +
    //                 " where Id = " + conn.escape(Id) +
    //                 " and CorpId = " + conn.escape(CorpId);
    //             const results = await db.exeTransaction(conn, queryString);
    //         }
    //     } catch (err) {
    //         console.error("updateUserContinuousFailCount: " + err);
    //         logger.error("updateUserContinuousFailCount: " + err);
    //         throw err;
    //     }

    // },

    // // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU1MTc2NzczMX0.QuT9rDAyT7WC47RGG-Y4W5o3lLG8orMnCixR-ktV_R0"
    // getAuth: async function (req) {
    //     try {
    //         const Authorization = req.header('Authorization');
    //         // let Authorization = '';
    //         // if (req.hasOwnProperty("headers"))
    //         //     if (req.headers.hasOwnProperty("authorization"))
    //         //         Authorization = req.headers.authorization;

    //         // console.log("Authorization in getAuth :" + Authorization);

    //         if (!Authorization) throw new Error('Please Sign in.');

    //         // const {
    //         //     userId
    //         // } = jwt.verify(token, APP_SECRET);
    //         const token = Authorization.replace('Bearer ', '');

    //         const decoded = jwt.verify(token, APP_SECRET);
    //         // log("decoded in getAuth :" + JSON.stringify(decoded));
    //         // return {
    //         //     CorpId: decoded.CorpId,
    //         //     userId: decoded.userId
    //         // }
    //         return decoded;



    //         // return {
    //         //     CorpId: null,
    //         //     userId: null
    //         // };

    //     } catch (err) {
    //         console.error("getAuth: " + err);
    //         logger.error("getAuth: " + err);
    //         throw err;
    //     }
    // },

    // checkAuthority: async function (token) {
    //     try {
    //         // const Authorization = req.header('Authorization') || '';
    //         // console.log("checkAuthority input token:" + token);

    //         if (token) {

    //             // const {
    //             //     userId
    //             // } = jwt.verify(token, APP_SECRET);
    //             // const token = Authorization.replace('Bearer ', '');

    //             const decoded = jwt.verify(token, APP_SECRET);
    //             // console.log("decoded in checkAuthority :" + JSON.stringify(decoded));
    //             return decoded;
    //             // return {
    //             //     // userId: decoded.userId,
    //             //     // userGroup: [String]
    //             //     // NetGroup: [String]
    //             // }

    //         }
    //         throw new Error('Please Sign in.');

    //     } catch (err) {
    //         console.error("checkAuthority: " + err);
    //         logger.error("checkAuthority: " + err);
    //         throw err;
    //     }
    // },
    // // getAuth: async function (req) {
    // //     try {
    // //         const Authorization = req.header('Authorization') || '';
    // //         console.log("Authorization in getAuth :" + Authorization);

    // //         if (Authorization) {
    // //             const token = Authorization.replace('Bearer ', '');
    // //             try {
    // //                 // const {
    // //                 //     userId
    // //                 // } = jwt.verify(token, APP_SECRET);
    // //                 const decoded = jwt.verify(token, APP_SECRET);
    // //                 console.log("decoded in getAuth :" + JSON.stringify(decoded));

    // //                 console.log("userId in getAuth :" + decoded.userId);

    // //                 let currentTime = new Date().getTime() / 1000;
    // //                 console.log("exp in getAuth :" + decoded.exp + ", now:" + currentTime);
    // //                 if (decoded.exp >= currentTime) {
    // //                     console.log("not expired");
    // //                     return {
    // //                         userId: decoded.userId
    // //                     }
    // //                 } else throw new Error('Your session expired. Sign in again.');
    // //             } catch (err) {
    // //                 throw err;
    // //             }
    // //         }
    // //         // throw new Error('Please Sign in.');
    // //         // throw  Error('Please Sign in.');
    // //         console.log("No Authorization");

    // //         throw new Error('Not authenticated');
    // //     } catch (Error) {
    // //         throw new Error('Not authenticated');
    // //         //  throw Error;
    // //     }
    // // }



    // updateUserPWByNoBySecurityManager: async function (
    //     conn = null,
    //     No = null,
    //     CorpId = null,
    //     Id = null,
    //     // OldPW = null,
    //     NewPW = null,
    //     MustPWUpdate = false,
    //     token = null

    // ) {
    //     try {
    //         if (!token) throw new Error("Token is needed");
    //         // console.log("MustPWUpdate:" + MustPWUpdate);
    //         if (MustPWUpdate != true) MustPWUpdate = false;
    //         // console.log("MustPWUpdate:" + MustPWUpdate);

    //         const user = await this.checkAuthority(token);
    //         console.log("user: " + JSON.stringify(user));

    //         let isSecurityManager = false;
    //         for (let i = 0; i < user.userGroup.length; i++) {
    //             if (SECURITY_MANAGER_UGR.includes(user.userGroup[i])) {
    //                 isSecurityManager = true;
    //                 break;
    //             }
    //         }

    //         if (!isSecurityManager) throw new Error("Security Manager Level is needed");


    //         // 신규 PW로 변경.
    //         const encNewPW = await plain_pw.encryptUserPW(NewPW);


    //         const queryString =
    //             "update Users set " +
    //             "PW = NULLIF(" + conn.escape(encNewPW) + ", null)," +
    //             "ContinuousFailCount = 0," +
    //             "MustPWUpdate = " + MustPWUpdate + "," +
    //             "PWCreatedDate = now() " +
    //             "where Id = " + conn.escape(Id) +
    //             " and No = " + conn.escape(No)

    //         const results = await db.exeTransaction(conn, queryString);
    //         return results;
    //     } catch (err) {
    //         console.error("updateUserPWByNoBySecurityManager: " + err);
    //         logger.error("updateUserPWByNoBySecurityManager: " + err);
    //         throw err;
    //     }
    // },
};