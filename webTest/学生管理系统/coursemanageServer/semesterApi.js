
var express=require('express');
const route = express.Router();
const MysqlBase = require('./mysqlPool')
//查询所有管理员的数量
route.get('/getSemesterCount', async(req,res) => {
    let sql = 'select count(*) as count from semester';
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
route.get('/getSemesterList',async(req,res) => {
    let sql = 'select * from semester';
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
route.post('/addSemester',async(req,res) => {
    console.log("add");
    console.log(req.body.data);

    let name = req.body.data.name;
    let type = req.body.data.type;
    let startTime = req.body.data.startTime.substr(0,10);
    let endTime = req.body.data.endTime.substr(0,10);

    let sql = 'insert into semester (name, type, startTime, endTime) values (?,?,?,?)';
    let sqlArr = [name,type,startTime,endTime];
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
route.post('/deleteSemester',async(req,res) => {
    console.log("delete");
    console.log(req.body.data);
    let deleteId = req.body.data;
    let sql = 'delete from semester where id = ?'
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
