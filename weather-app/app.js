// const request = require('request');

// const url = 'https://newsapi.org/v2/everything?q=tesla&from=2023-06-17&sortBy=publishedAt&apiKey=4b4b40292b7e454888ad30be9f74ca83';

// const options = {
//   url: url,
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
//   },
//   json: true
// };

// request(options, (error, response) => {
//     //const data = JSON.parse(response.body)
//   console.log(response.body.articles[0].source.name);
// });


// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();

// mongoose.connect("mongodb://localhost:27017/latestdb",{
//     useNewUrlParse:true, useUnifiedTopology:true,},
//     (err) => {
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log('connected');
//         }
//     }
//     );

// app.listen(3000,() => {
//     console.log('port 3000');
// });    


const {MongoClient} = require('mongodb')
const url= 'mongodb://localhost:27017';
const databaseName='task-manager';
const client= new MongoClient(url);

async function getData()
{
    let result = await client.connect();
    db = result.db(databaseName);
    // db.collection('task').insertOne({
    //     name: 'Animesh',
    //     age: 23,
    //     eligible: true,
    //   }, (err, result) => {
    //     if (err) {
    //       console.log('Error inserting data:', err);
    //     } else {
    //       console.log('Data inserted:', result.ops);
    //     }
    
    //     client.close()});
    db.collection('task').insertMany([
        {
            name:'Omkar',
            age:23
        },
        {
            name:'viral',
            age:22
        }
    ], (err, result)=>{
        if (err) {
                  console.log('Error inserting data:', err);
                } else {
                  console.log('Data inserted:', result.ops);
    }
    client.close()});
    const query = {age:23};
    db.collection('task').deleteMany(query, function(err, result) {

           console.log(result);
            if (err) {
              console.log('Error inserting data:', err);
            } else {
              console.log('Data inserted:', result.ops);
            }
        
            client.close();
        });
    let collection = db.collection('task');
    let data = await collection.find({}).toArray();
    console.log(data)


}

getData();

