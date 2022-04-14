const {db} = require("./db_config");

module.exports = {
    //데이터 호출
    getData: async function (table) {
        try {
            let res = db.getData(`${table}`); 
            console.log(`getData ${table} success`); 
            return res;
        } catch (err) {
            console.error(`getData ${table} catch error : ${err}`);

        } 
    },
    //데이터 생성
    create: async function (table, queryStatement) {

        try {
            db.push(`${table}`,queryStatement); 
            console.log(`create ${table} success`);
           
        } catch (err) {
            console.error(`create ${table} catch error : ${err}`);
            throw err;
        } 
    },
    //데이터 삭제
    delete: async function (table, queryStatement) {
        try {
            db.delete(`${table}`); 
            console.log(`delete ${table} success`);
            // logger.error("not connected due to error : " + err);
            
        } catch (err) {
            console.error(`delete ${table} catch error : ${err}`);
            // logger.error("exe main catch error : " + err);
            throw err;
        } 
    },
}