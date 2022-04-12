const {db} = require("./db_config");

module.exports = {
    getData: async function (table) {
        try {
            let res = db.getData(`${table}`); 
            console.log(`select ${table} success`);
            // logger.error("not connected due to error : " + err);
            return res;
        } catch (err) {
            console.error(`select ${table} catch error : ${err}`);
            // logger.error("exe main catch error : " + err);
            throw err;
        } 
    },
    create: async function (table, queryStatement) {

        try {
            db.push(`${table}`,queryStatement); 
            console.log(`create ${table} success`);
            // logger.error("not connected due to error : " + err);
            // return {userId:queryStatement.id}; //어떤 id  회원가입 완료를 띄우기위한 id값
        } catch (err) {
            console.error(`create ${table} catch error : ${err}`);
            // logger.error("exe main catch error : " + err);
            throw err;
        } 
    },
    delete: async function (table, queryStatement) {
        try {
            db.push(`${table}`,queryStatement); 
            console.log(`create ${table} success`);
            // logger.error("not connected due to error : " + err);
            
        } catch (err) {
            console.error(`create ${table} catch error : ${err}`);
            // logger.error("exe main catch error : " + err);
            throw err;
        } 
    },
}