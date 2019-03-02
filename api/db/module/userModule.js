//数据模型
const mongoose = require('mongoose')
//创建schema 对象
 let UserSchema = new mongoose.Schema({
     name:{type:String,required:true},
     pass:{type:String,required:true}
     
 });
 //将schema转换成数据模型
 let user = mongoose.model('personnels',UserSchema);//参数1  是集合的名字  与数据模型关联的schema对象
module.exports = user