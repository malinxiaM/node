//数据模型
const mongoose=require('mongoose')
let UserSchema = new mongoose.Schema({
    name:{type:String ,required:true} ,
    Jurisdiction:{type:Number,required:true}, //required 必须
  });
 // 4. 将schema转化为数据模型
let model = mongoose.model('Jurisdictions', UserSchema);
module.exports=model