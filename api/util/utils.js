
//项目配置文件
const config = require('../config')//引入config 里的debug
let utils = {
    log:function(msg){
        if(config.debug){return false}
        console.log(msg)
    },
    sendRes:function(res,err,msg,data){
        let obj = {
            err:err,
            msg:msg,
            data:data||null
        }
        res.send(obj)
    }
}

module.exports=utils

