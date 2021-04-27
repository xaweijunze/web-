
var express=require('express');
const route = express.Router();
const MysqlBase = require('./mysqlPool')
const url = require('url');
//查询所有学生的数量
route.get('/getListCount', async(req,res) => {
    let sql = 'select count(*) as count from student';
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
route.get('/getList',async(req,res) => {
    let sql = 'select * from student';
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
route.post('/addStudent',async(req,res) => {
    console.log("add");
    console.log(req.body.data);
    let id = req.body.data.id;
    let name = req.body.data.name;
    let sex = req.body.data.sex;
    let age = req.body.data.age;
    let sql = 'insert into student (id, name, sex, age) values (?,?,?,?)';
    let sqlArr = [id,name,sex,age];
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
route.post('/searchStudent',async(req,res) => {
    console.log("search");
    console.log(req.body.data);
    let searchLabel = req.body.data.searchLabel;
    let searchInfo = req.body.data.searchInfo;
    let sql = 'select * from student where ' + searchLabel + ' like \'%' + searchInfo + '%\''
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
//删除
route.post('/deleteStudent',async(req,res) => {
    console.log("search");
    console.log(req.body.data);
    let deleteId = req.body.data.deleteId;
    let sql = 'delete from student where id = ?'
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
