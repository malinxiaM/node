//数据模型
const mongoose = require('mongoose')
//创建schema 对象
 let UserSchema = new mongoose.Schema({
     name:{type:String,required:true},
     price:{type:Number,required:true},
     imgPath:{type:String,required:true},//default 表示默认项
     desc:{type:String,required:true},
     type:{type:String,required:true},
     num:{type:Number,required:true}
 });
 //将schema转换成数据模型
 let model = mongoose.model('foods',UserSchema);//参数1  是集合的名字  与数据模型关联的schema对象
module.exports = model