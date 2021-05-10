
var express=require('express');
const route = express.Router();
const MysqlBase = require('./mysqlPool')
route.get('/', async(req,res) => {
    
    res.json({
        status: '200',
        msg: 'success',
        data: "success"
    })
}),
//查询所有部门的数量
route.get('/getDepartmentCount', async(req,res) => {
    let sql = 'select count(*) as count from department';
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
route.get('/getDepartmentList',async(req,res) => {
    let sql = 'select * from department';
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
route.post('/addDepartment',async(req,res) => {
    console.log("add");
    console.log(req.body.data);

    let name = req.body.data.name;
    let manager = req.body.data.manager;

    let sql = 'insert into department (name, manager) values (?,?)';
    let sqlArr = [name,manager];
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
route.post('/deleteDepartment',async(req,res) => {
    console.log("delete");
    console.log(req.body.data);
    let deleteId = req.body.data;
    let sql = 'delete from department where id = ?'
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
