const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
      type:String,
      trim:true,
      validate(value){
        if(value.length==0){
            throw new Error('invalid name')
        }
      }
    },
    email:{
        type:String,
        required: true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }
    },
    password:{
       type:String,
       required:true,
       trim:true,
       validate(value){
        if(value.length<=6){
            throw new Error('password should be more than 6 characters')
        }
        if(value.toLowerCase().includes('password')){
            throw new Error('wrong password')
        }
       }
    },
    age:{
      type:Number,
      default:0,
      validate(value){
        if(value<0){
            throw new Error('age must be positive')
        }
      }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        },
    }
    
] 
})

userSchema.methods.generateAuthToken = async function() {
      const user = this
      const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse')
      user.tokens = user.tokens.concat({token})
      await user.save()
      return token
}

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function(next){
     const user = this
     if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
     }
     console.log('just before saving')
     next()
})
const User = mongoose.model('User',userSchema )

module.exports = User