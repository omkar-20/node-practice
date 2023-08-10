const fs = require('fs')
// const book = {
//     title: 'ego is the enemy',
//     author: 'Ryan holiday'
// }

// const bookJson= JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJson)


const dataBuffer = fs.readFileSync('1-json.json')
const dataJson = dataBuffer.toString();
const data = JSON.parse(dataJson)
data.name="viral"
data.age=39
const userJson = JSON.stringify(data)
fs.writeFileSync('1-json.json',userJson)
console.log(data.name)