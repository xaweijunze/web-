const express = require('express')
const app = express()

const ManagerApi = require('./ManagerApi')
const departmentApi = require('./departmentApi')
const TeacherApi = require('./TeacherApi')
const semesterApi = require('.//semesterApi')


const bodyParser = require('body-parser')
 
app.use(bodyParser.urlencoded({extended:false}));
 
app.use(bodyParser.json());
 
// 跨域问题解决
app.all('*', function (req, res, next) {
    //设置请求头
    //允许所有来源访问
    res.header('Access-Control-Allow-Origin', '*')
    //用于判断request来自ajax还是传统请求
    res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
    //允许访问的方式
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    //修改程序信息与版本
    // res.header('X-Powered-By', ' 3.2.1')
    //内容类型：如果是post请求必须指定这个属性
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
  })
  app.use(ManagerApi)
  app.use(departmentApi)
  app.use(TeacherApi)
  app.use(semesterApi)

app.listen(3000, function() {
  console.log('express 正在监听 3000 端口')
})
