const mongoose = require('mongoose')
//const validator = require('validator')


mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    //useCreateIndex:true
})



// const me = new User({
//     name:'  Om  kar   ',
//     email:'ngjn@gMAil.com   ',
//     password:'abcmxlsmxls'
// })

// me.save().then((me)=>{
//     console.log(me)
//  }).catch((error)=> {
//     console.log('error!', error)
//  })

// const you = new User({
//     name:'Aryan',
//     age:22
// })

// you.save().then(()=>{
//     console.log(you)
// }).catch((error)=>{
//     console.log(error)
// })


// const User = mongoose.model('User1',{
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const task = new User({
//     description:'task done again',
   
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log(error)
// })