const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

 const app = express()

 const port = 3000

//  app.use((req,res,next)=>{
//     // console.log(req.method, req.path)
//     // next()
//     if(req.method==='GET'){
//        res.send('GET requests are disabled')
//     }else{
//         next()
//     }
//  })
 app.use(express.json())
 app.use(userRouter)
 app.use(taskRouter)

 
 app.listen(port, ()=>{
    console.log('server is up on port '+ port)
 })

 
 const bcrypt = require('bcryptjs')

 const myFunction = async ()=>{
    const password = 'omkar1234'
    const hashedPassword = await bcrypt.hash(password,8)
    console.log(password)
    console.log(hashedPassword)
    const isMatch = await bcrypt.compare('omkar1234', hashedPassword)
    console.log(isMatch)
 }

 myFunction()