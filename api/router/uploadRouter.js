//图片上传
const express = require('express')
const router = express.Router()
const utils = require('../util/utils')
const multer = require('multer')
const fs = require('fs')
const Path = require('path')
const upload = multer({dest:'uploads/'})//指定上传的缓存目录
router.post('/img',upload.single('lala'),(req,res)=>{
   let {path,mimetype}=req.file
    let ext =mimetype.split('/')[1]//获取后缀名
    if(['jpg','jpeg','png','gif'].indexOf(ext)==-1){
        return utils.sendRes(res,-1,'图片格式错误',null)
    }
    let name = (new Date()).getTime()+parseInt(Math.random()*99999)
   fs.readFile(path,(err,data)=>{
       if(err){return utils.sendRes(res,-2,'上传失败',null)}
       fs.writeFile(Path.join(__dirname,`../public/img/${name}.${ext}`),data,'binary',(err)=>{
        if(err){return utils.sendRes(res,-2,'上传失败',null)}
        let url =`/public/img/${name}.${ext}`
        return utils.sendRes(res,0,'上传成功',url)
       })
   })
})
module.exports=router