// 创建发送邮箱验证码的模块
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "657135629@qq.com", // generated ethereal user
        pass: "paunddjetysxbebd" // generated ethereal password
    }
});

function sendEmail(toMail,code){
    return new Promise((resolve,reject)=>{
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <657135629@qq.com>', // sender address
            to: toMail,                             // list of receivers
            subject: "妖丿刀提醒您，您的验证码已收到，请注意查收",                     // Subject line
            text: `您此次的验证码为${code},五分钟内有效哦~`,                   // plain text body
            // html: "<b>Hello world?</b>"             // html body
        };
        transporter.sendMail(mailOptions,(err)=>{
            if(err){
                reject(err);
            }else{
                resolve(code);
            }
        });
    })
}

// sendMail("657135629@qq.com",123456)
// .then(()=>{
//     console.log("send success");
// })
// .catch((err)=>{
//     console.log(err)
// })

module.exports={sendEmail};
