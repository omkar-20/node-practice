const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')


router.post('/users', async (req,res)=>{
    //  console.log(req.body)
    //  if(!req.body){
    //     res.send('getting response')
    //  }
    //  res.send('testing!')
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
    
 })

 router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        //res.send(user)
        res.send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
 })
 router.get('/users',auth, async (req,res)=>{
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send(e) 
    }
    
    // User.find({}).then((users)=>{
    //    res.send(users)
    // }).catch((e)=>{
    //    res.status(500).send()
    // })
 })

 router.get('/users/:id', async (req,res)=>{
    const _id=req.params.id
    try{
       const user = await User.findById(_id)
       if(!user){
        return res.status(404).send()
       }
       res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
    // User.findById(_id).then((user)=>{
    //    if(!user){
    //     return res.status(404).send()
    //    }
    //    res.send(user)
    // }).catch((e)=>{
    //      res.status(500).send()
    // })
 })

 router.patch('/users/:id', async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperations = updates.every((update)=> {
        return allowedUpdates.includes(update)
    })
    if(!isValidOperations){
        return res.status(400).send({error : 'invalid updates'})
    }
    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update)=>{
            user[update] = req.body[update]
        })
        await user.save()
      //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
      if(!user){
        return res.status(404).send()
      }
      res.send(user)
    }catch(e){
       res.status(400).send(e)
    }
 })

 router.delete('/users/:id', async (req, res)=>{
    try{
      const user = await User.findByIdAndDelete(req.params.id)
      if(!user){
        res.status(404).send()
      }
      res.send(user)
    }catch(e){
       res.status(500).send(e)
    }
 })

module.exports = router