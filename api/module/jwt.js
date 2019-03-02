//token的验证
const jwt=require(`jsonwebtoken`)
const scrict=`sjhfdiashfashfalkjfajafsjafj`
function creatToken(playload){
    playload.ctime=Date.now()
    return jwt.sign(playload,scrict)
}

function checkToken(token){
    return new Promise((resolve,reject)=>{
       jwt.verify(token,scrict,(err,data)=>{
           if(err){reject(`token 验证失败`)}
           resolve(data)
       })
    })
}

module.exports={
    creatToken,checkToken
}
/*
      流程:
      
      服务端收到请求，去验证用户名与密码
      验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端
      客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
      客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
      服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据
      
      
      
      
      
 */