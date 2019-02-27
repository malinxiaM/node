//入口文件
const express = require('express')
const app = express()
const path = require('path')
//连接数据库
const con = require('./db/connect')
//引入小插件
const utils=require('./util/util')
//基本插件
//post 请求
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
//静态文件
app.use('/public',express.static(path.join(__dirname,'./public')))

//路由配置
const adminFood=require('./router/foodRouter');
app.use('/admin/food',adminFood);

app.listen(3000,()=>{
    console.log('severe start in port:' + 3000)
})