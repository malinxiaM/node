const config = require("../config");
const jwt =require("../module/jwt");

let util = {
    log : function(msg){
        if(config.debug){
            console.log(msg);
        }
    },
    verify : function(req,res,next){
        // 1.获取token
        let {token} = req.body;
        // 2.验证token是否存在
        if(!token){
            return res.send({
                state : -999 ,
                msg : "token缺失"
            })
        }
        // 3.验证token
        jwt.checkToken(token)
        .then((data)=>{
            // 是否超时
            if(Date.now() - data.cTime > 7200000){
                return res.send({
                    state : -998 ,
                    msg : "token超时，请重新登录"
                })
            }else{
                // 成功后next
                next();
            }
        })
        .catch((err)=>{
            console.log(err);
            res.send({
                state : -997 ,
                msg : "token验证失败"
            })
        })
    }
}

module.exports = util;