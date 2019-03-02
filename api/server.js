//入口文件
const express = require('express')
const app = express()
const path = require('path')
//连接数据库
const con = require('./db/connect')
// 链接socket
const ws = require("./module/socket");
//引入小插件
const utils=require('./util/utils')
//基本插件
//post 请求
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
// //静态文件
app.use('/public',express.static(path.join(__dirname,'./public')))

// // 配置路由
const user = require("./router/userRouter");
app.use("/admin/user",utils.verify,user);

const adminUpload = require('./router/uploadRouter')
app.use('/admin/upload',utils.verify,adminUpload)

const adminFood=require('./router/foodRouter');
app.use('/admin/food',utils.verify,adminFood);

app.listen(3000,()=>{
    console.log('severe start in port:' + 3000)
})