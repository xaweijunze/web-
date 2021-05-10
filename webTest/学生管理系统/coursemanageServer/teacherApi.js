
var express=require('express');
const route = express.Router();
const MysqlBase = require('./mysqlPool')
//查询所有部门的数量
route.get('/getTeacherCount', async(req,res) => {
    let sql = 'select count(*) as count from teacher';
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
route.get('/getTeacherList',async(req,res) => {
    let sql = 'select * from teacher';
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
route.post('/addTeacher',async(req,res) => {
    console.log("add");
    console.log(req.body.data);

    let name = req.body.data.name;
    let phoneNum = req.body.data.phoneNum;
    let WechatBind = req.body.data.WechatBind;
    let depart = req.body.data.depart;

    let sql = 'insert into teacher (name,phoneNum, WechatBind,depart) values (?,?,?,?)';
    let sqlArr = [name,phoneNum,WechatBind,depart]
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
route.post('/deleteTeacher',async(req,res) => {
    console.log("delete");
    console.log(req.body.data);
    let deleteId = req.body.data;
    let sql = 'delete from teacher where id = ?'
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
