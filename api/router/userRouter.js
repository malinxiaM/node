
const express = require("express");
const router = express();
const mail = require("../module/mail");
const utils = require("../util/utils");
const userDB = require("../db/module/personnelModel");

let _code = [];

// 获取邮箱验证码
router.post("/getMailCode",(req,res)=>{
    // 1.获取数据
    let verifyCode = parseInt(100000 + Math.random()*1000000);
    let {name} = req.body;
    mail.send(name,verifyCode)
    .then((data)=>{
        res.send({
            state : 0 ,
            msg : "发送成功",
        })
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
    let {name,password,code} = req.body;
    utils.log(_code);
    // userDB.find()
    // .then((data)=>{
    //     utils.log(data);
        // return res.send({
        //     state : -4 ,
        //     msg : "用户名重复，请重新输入"
        // })
    // })
    // .catch((err)=>{

        // 2.验证码是否正确
        _code.forEach((item,index)=>{
            // utils.log(index,item);
            if(item.code == code && item.name == name){
                // 3.验证码是否超时
                if((Date.now() - item.getCodeTime) > 5 * 60 *1000){
                    return res.send({
                        state : -2 ,
                        msg : "验证码超时，请重新获取",
                    })
                }else{
                    userDB.insertMany({name,password})
                    .then((data)=>{
                        res.send({
                            state : 0 ,
                            msg : "注册成功",
                        })
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
    // })

})

module.exports = router;