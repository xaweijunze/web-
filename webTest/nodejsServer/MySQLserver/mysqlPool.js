

var mysql = require("mysql");

//数据库操作
// 链接池：创建多个链接、复用与分发链接

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'test'
    })
//封装
    var query = function(sql,options,callback){
        pool.getConnection(function(err,connection){
            if(err){
                callback(err,null,null);
            }
            else
            connection.query(sql,options,function(err,results){
                callback(err,results) ;  //结果回调
                connection.release();    //释放连接资源|与connection.destroy（）不同
            })
        })
    }

    module.exports = query;


