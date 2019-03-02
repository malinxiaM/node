//数据模型
const mongoose=require('mongoose')
let UserSchema = new mongoose.Schema({
    name:{type:String ,required:true} ,
    password:{type:String,required:true}, //required 必须
    email:{type:String ,required:true}, //default 默认
    sex:{type:String,required:true},
    num:{type:Number,required:true},
    date:{type:String}
  });
 // 4. 将schema转化为数据模型
let model = mongoose.model('menber', UserSchema);
module.exports=model
