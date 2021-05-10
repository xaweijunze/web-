
var express=require('express');
const route = express.Router();
const MysqlBase = require('./mysqlPool')
//查询所有管理员的数量
route.get('/getManagerCount', async(req,res) => {
    let sql = 'select count(*) as count from manager';
    let sqlArr = [];
    MysqlBase(sql ,sqlArr ,(_err,data)=>{
        if(_err) {
            res.json({
                status :'404',
                msg: 'fail',
                data: _err
            })
        }else{
            const results = data;
            res.json({
                status: '200',
                msg: 'success',
                data: results
            })
        }
    })
}),
//查询所有记录
route.get('/getManagerList',async(req,res) => {
    let sql = 'select * from manager';
    let sqlArr = [];
    MysqlBase(sql, sqlArr, (_err,data)=>{
        if(_err){
            res.json({
                status: '404',
                msg: 'fail',
                data: _err
            })
        }else{
            const results = data;
            res.json({
                status: '200',
                msg: 'success',
                data: results
            })
        }
    })
}),
//新增
route.post('/addManager',async(req,res) => {
    console.log("add");
    console.log(req.body.data);

    let username = req.body.data.username;
    let type = req.body.data.type;
    let name = req.body.data.name;
    let code = req.body.data.usercode;

    let sql = 'insert into manager (username, type, name, code) values (?,?,?,?)';
    let sqlArr = [username,type,name,code];
    MysqlBase(sql, sqlArr, (_err,data)=>{
        if(_err){
            res.json({
                status: '404',
                msg: 'fail',
                data: _err
            })
        }else{
            const results = data;
            res.json({
                status: '200',
                msg: 'success',
                data: results
            })
        }
    })
}),
//搜索
// route.post('/searchStudent',async(req,res) => {
//     console.log("search");
//     console.log(req.body.data);
//     let searchLabel = req.body.data.searchLabel;
//     let searchInfo = req.body.data.searchInfo;
//     let sql = 'select * from student where ' + searchLabel + ' like \'%' + searchInfo + '%\''
//     let sqlArr = [];
//     MysqlBase(sql, sqlArr, (_err,data)=>{
//         if(_err){
//             res.json({
//                 status: '404',
//                 msg: 'fail',
//                 data: _err
//             })
//         }else{
//             const results = data;
//             res.json({
//                 status: '200',
//                 msg: 'success',
//                 data: results
//             })
//         }
//     })
// }),
//删除
route.post('/deleteManager',async(req,res) => {
    console.log("delete");
    console.log(req.body.data);
    let deleteId = req.body.data;
    let sql = 'delete from manager where id = ?'
    let sqlArr = [deleteId];
    MysqlBase(sql, sqlArr, (_err,data)=>{
        if(_err){
            res.json({
                status: '404',
                msg: 'fail',
                data: _err
            })
        }else{
            const results = data;
            res.json({
                status: '200',
                msg: 'success',
                data: results
            })
        }
    })
}),
module.exports = route;
