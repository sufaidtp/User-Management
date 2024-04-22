const express=require("express")
const session = require('express-session')
const nocache=require("nocache")
const app=express()
const userRoute=require("./router/userRoute")
const adminRoute=require("./router/adminRoute")


app.use(session({
    secret:'k68adsf9a9f$',
    resave:false,
    saveUninitialized:true,

}))
app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))
app.use(nocache())

app.use(express.static('public'))



app.use("/",userRoute)
app.use("/admin",adminRoute)








app.listen(2000,()=>{
    console.log("server start")
})