require('../src/db/mongoose.js')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('64c785fe4073315d8e1a5ca0').then((task)=>{
//    console.log(task)
//    return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async (id,completed)=>{
   const task = await Task.findByIdAndDelete(id)
   const count = await Task.countDocuments({completed})
   return count
}

deleteTaskAndCount('64c7f25b193623e54fa92e03', false).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})