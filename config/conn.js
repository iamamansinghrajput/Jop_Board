const mongoose = require('mongoose');

const DB = "mongodb+srv://singhaman2321:WnsvJtYlDJK63fiV@cluster0.spqsjdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
 
mongoose.connect(DB, {})
.then(() =>{
    console.log("connection successfull")
})
.catch((err) => {  
    console.log("no connection"); 
    console.log(err);
});