
const express = require("express");
const router = express.Router();
const mail = require("../module/mail");
const utils = require("../util/utils");
const userDB = require("../db/module/menberlModel");
const jsonwebtoken = require("../module/jwt");

let _code = [];

// 获取邮箱验证码
router.post("/getMailCode",(req,res)=>{
    // 1.获取数据
    let verifyCode = parseInt(100000 + Math.random()*1000000);
    let {name} = req.body;
    // 发送数据
    mail.send(name,verifyCode)
    .then((data)=>{
        res.send({
            state : 0 ,
            msg : "发送成功",
        })
        // 成功后将信息存入全局变量的临时数组中
        _code.push({
            name : name,
            code : data,
            getCodeTime : Date.now()
        })
    })
    .catch((err)=>{
        res.send({
            state : -1 ,
            msg : "发送失败失败" + err,
        })
        utils.log(err);
    })
})




// 注册接口：
router.post("/register",(req,res)=>{
    // 在server已经解析了body，所以此模块不再重复
    // 1.获取数据
    let {name,password,code,email,sex,num} = req.body;
    // utils.log(_code);
    userDB.find({name})
    .then((data)=>{
        // utils.log(data);
        // res.send({
        //             
        //         })
        if(data[0]){
            res.send({
                state : -6 ,
                msg : "用户名重复，请重新输入"
            })
            return false;
        }
        // 2.验证码是否正确
        _code.forEach((item,index)=>{
            // utils.log(index,item);
            if(item.code == code && item.name == name){
                // 3.验证码是否超时
                if((Date.now() - item.getCodeTime) > 5 * 60 *1000){
                    // 超时后清空这个验证码
                    item = null;
                    return res.send({
                        state : -2 ,
                        msg : "验证码超时，请重新获取",
                    })
                    
                }else{
                    userDB.insertMany({name,password,email,sex,num})
                    .then((data)=>{
                        res.send({
                            state : 0 ,
                            msg : "注册成功",
                        })
                        utils.log(data);
                    })
                    .catch((err)=>{
                        utils.log(err);
                        res.send({
                            state : -5 ,
                            msg : "写入数据库失败",
                        })
                    })
                }
            }else{
                res.send({
                    state : -3 ,
                    msg : "验证码错误",
                })
            }
        })
    })
    .catch((err)=>{
        res.send({
            state : -7 ,
            msg : "数据库查询错误",
        })
        utils.log(err);
    })
})


// 登录接口
// http://localhost:3000/admin/user/login
router.post('/login', function (req, res) {
    // 获取前端发送过来的用户名和密码
    let {name,password} = req.body;
    let token = jsonwebtoken.creatToken({name});
    utils.log(token);
    // 查找数据库中是否存在账号密码
    userDB.find(
        {
            name : name ,
            password : password
        }
    )
    .then((data)=>{
        utils.log(data);
        res.send({
            state : 0 ,
            msg : "您已登陆成功",
            // 将生成的token返回给前端
            data : token,
        })
    })
    // 如果失败，走catch
    .catch((err)=>{
        utils.log(err);
        res.send({
            state : -1 ,
            msg : "账号或密码错误"
        })
    })
})

// router.post("/test",utils.verify,(req,res)=>{
//     res.send("token验证成功");
// })
router.post("/test",(req,res)=>{
    userDB.find()
    .then((data)=>{
        console.log(data);
        res.send(data);
    })
})

module.exports = router;