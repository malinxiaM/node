const mongoose = require('mongoose')
const config = require('../config')
mongoose.connect(config.db,{useNewUrlParser:true});
let db = mongoose.connection;//获取连接对象进行监听
db.on('open',()=>{
    console.log('连接 ok')
});
db.on('error',(err)=>{
    console.log('连接 nook')
})