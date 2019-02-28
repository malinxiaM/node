const WebSocket = require("ws");
// 开启socket服务器
const ws = new WebSocket.Server({port :8080},(res)=>{
    console.log("Socket Server start , port : 8080");
})

// 前端连接上服务器的函数
ws.on("connection",(client)=>{
    console.log("有一位用户已连接");
    client.send("welcome");

    // 监听客户端给服务器发送的消息
    client.on("message",(msg)=>{
        console.log(msg);
    })

    // 客户端断开连接
    client.on("close",(msg)=>{
        client.send("已断开连接");
        console.log("有一位用户已离开");
    })
})


module.exports = ws;