
const express =require('express')
//实例化插件
const router=express.Router()
//引入自己写的插件
const utils=require('../util/util')
//数据模型
const foodModel=require('../module/foodModel') 
const personnelModel=require('../module/personnelModel') 
const menberlModel=require('../module/menberlModel') 
/* 添加*/
router.post('/addfood',(req,res)=>{
    //接受数据
    let {name,price,imgPath,desc,type,num}= req.body
    //处理数据
    foodModel.insertMany({name,price:Number(price),imgPath,desc,type,num:Number(num)})
    //返回数据
    .then((data)=>{
      utils.sendRes(res,0,'add ok',null)
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,err._message,null)})
})

/* 添加人员*/
router.post('/addpersonnel',(req,res)=>{
  //接收数据(名字，密码，权限，邮箱，手机，时间)
  let {name,password,type,email,num,date}= req.body
  //处理数据
  personnelModel.insertMany({name,password,type:Number(type),email,num:Number(num),date})
  //返回数据
  .then((data)=>{
    utils.sendRes(res,0,'add ok',null)
  })
  .catch((err)=>{
      utils.log(err)
      utils.sendRes(res,-1,err._message,null)})
})

/* 添加会员*/
router.post('/addmenber',(req,res)=>{
  //接收数据(名字，密码，权限，邮箱，手机,性别，时间)
  let {name,password,type,email,num,sex,date}= req.body
  //处理数据
  menberlModel.insertMany({name,password,type:Number(type),email,num:Number(num),sex,date})
  //返回数据
  .then((data)=>{
    utils.sendRes(res,0,'add ok',null)
  })
  .catch((err)=>{
      utils.log(err)
      utils.sendRes(res,-1,err._message,null)})
})


/*修改*/
router.post('/updatafood',(req,res)=>{
  //声明_id
    let _id =req.body._id;
   //结构赋值声明修改数据
   let {name,price,imgPath,desc,ntypeum,type,num} = req.body;
   console.log(`修改的值：${name},${price},${imgPath},${desc},${type},${ntypeum},${type},${num}`);
   //把值传入数据模型
   foodModel.updateOne({_id:_id},{name,price,imgPath,desc,type,num})
   .then((date) =>{
      utils.log(date);
     //返回值
     utils.sendRes(res,0,"up ok",null);
   })
   .catch((err) => {
      utils.log(err);
      utils.sendRes(res,-1,err._message,null);
   })
})

/*修改人员*/
router.post('/updatapersonnel',(req,res)=>{
  //声明_id
    let _id =req.body._id;
   //结构赋值声明修改数据
   //接收数据(名字，密码，权限，邮箱，手机)
  let {name,password,type,email,num,date}= req.body
   //把值传入数据模型
   personnelModel.updateOne({_id:_id},{name,password,type,email,num,date})
   .then((date) =>{
      utils.log(date);
     //返回值
     utils.sendRes(res,0,"up ok",null);
   })
   .catch((err) => {
      utils.log(err);
      utils.sendRes(res,-1,err._message,null);
   })
})

/*修改会员*/
router.post('/updatamenber',(req,res)=>{
  //声明_id
    let _id =req.body._id;
   //结构赋值声明修改数据
   //接收数据(名字，密码，权限，邮箱，手机)
  let {name,password,type,email,num,sex,date}= req.body
   //把值传入数据模型
   menberlModel.updateOne({_id:_id},{name,password,type,email,num,sex,date})
   .then((date) =>{
      utils.log(date);
     //返回值
     utils.sendRes(res,0,"up ok",null);
   })
   .catch((err) => {
      utils.log(err);
      utils.sendRes(res,-1,err._message,null);
   })
})


/*删除 单独删除 */
router.post("/remove",(req,res) =>{ 
    //接收数据
    let _id =req.body._id;
    //向数据模型传输数据
    foodModel.deleteOne({_id:_id})
    .then((data) =>{
        utils.log(data);
        utils.sendRes(res,0,'remove ok',null)
    })
    .catch((err) =>{
      utils.log(err)
      utils.sendRes(res,-1,err._message,null)
    })
})

/*删除 单独删除人员 */
router.post("/remove_personnel",(req,res) =>{ 
  //接收数据
  let _id =req.body._id;
  //向数据模型传输数据
  personnelModel.deleteOne({_id:_id})
  .then((data) =>{
      utils.log(data);
      utils.sendRes(res,0,'remove ok',null)
  })
  .catch((err) =>{
    utils.log(err)
    utils.sendRes(res,-1,err._message,null)
  })
})

/*删除 单独删除会员 */
router.post("/remove_menber",(req,res) =>{ 
  //接收数据
  let _id =req.body._id;
  //向数据模型传输数据
  menberlModel.deleteOne({_id:_id})
  .then((data) =>{
      utils.log(data);
      utils.sendRes(res,0,'remove ok',null)
  })
  .catch((err) =>{
    utils.log(err)
    utils.sendRes(res,-1,err._message,null)
  })
})


/* 查询  */
router.post('/getfood',(req,res)=>{
  foodModel.find()
  .then((data)=>{
    console.log(data)
    utils.sendRes(res,0,'select ok',data)
  })
  .catch((err)=>{
      utils.log(err)
      utils.sendRes(res,-1,err._message,null)})
})

/* 查询人员  */
router.post('/getpersonnel',(req,res)=>{
  personnelModel.find()
  .then((data)=>{
    console.log(data)
    utils.sendRes(res,0,'select ok',data)
  })
  .catch((err)=>{
      utils.log(err)
      utils.sendRes(res,-1,err._message,null)})
})

/* 查询会员  */
router.post('/getmenber',(req,res)=>{
  menberlModel.find()
  .then((data)=>{
    console.log(data)
    utils.sendRes(res,0,'select ok',data)
  })
  .catch((err)=>{
      utils.log(err)
      utils.sendRes(res,-1,err._message,null)})
})


module.exports=router