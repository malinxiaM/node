const config=require('../config');
//项目的配置文件
let  utils={
    //打印
    log:function(msg){
        if(!config.debug){return false}
        console.log(msg)
    },
    //返回值（返回值（需要用到send方法），状态码，提示信息，数据）
    sendRes:function(res,err,msg,data){
        let obj={
            err:err,
            msg:msg,
            data:data||null
        }
        res.send(obj)
    } 
     
}
module.exports=utils
