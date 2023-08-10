const path = require('path')
const express= require('express')
const hbs=require('hbs')

const app = express()
console.log(__dirname)
console.log(path.join(__dirname, '../public'))

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res)=>{
    res.render('index', {
        title:'weather app',
        name:'omkar'

    })
})
app.get('/about', (req,res)=>{
    res.render('about',{
        title:'about me',
        name:'omkar'
    })
})
app.get('/help', (req,res)=>{
    res.render('help',{
        title:'help',
        name:'omkar',
        description:'contact for any help'
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'enter the correct address'
        })
    }
    res.send({
        location:'Bangalore',
        forecast:50+'degree'
    })
})
app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})
