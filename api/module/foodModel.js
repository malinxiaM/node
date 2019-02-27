//数据模型
const mongoose=require('mongoose')
let UserSchema = new mongoose.Schema({
    name:{type:String ,required:true} ,
    price:{type:Number,required:true}, //required 必须
    imgPath:{type:String ,required:false}, //default 默认
    desc:{type:String ,required:true},
    type:{type:String,required:true},
    num:{type:Number,required:true}
  });
 // 4. 将schema转化为数据模型
let model = mongoose.model('foods', UserSchema);
module.exports=model