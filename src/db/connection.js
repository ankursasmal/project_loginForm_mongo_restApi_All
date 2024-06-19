const mongosh=require('mongoose')

mongosh.connect('mongodb://localhost:27017/loginData').then(()=>{
    console.log('connectin success')
}).catch((e)=>{
    console.log('not connect')
})