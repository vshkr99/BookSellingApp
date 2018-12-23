const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const fs=require('fs');
const Collection=require('./mongo/collection');
const multer=require('multer');
const mongoose=require('mongoose');

var r=require('./routes/main');
var r=require('./routes/main');
var upload=multer({dest: './uploads/'});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  

var routes={
    main : r.main.jsonPage,
    mainPage: r.main.mainPage,
    explore : r.main.explore,
    add: r.main.add,
    delete: r.main.delete,
    image: r.main.image
}



mongoose.connect('mongodb://localhost:27017/mydb',{useNewUrlParser:true})
    .then(()=>{
        console.log("database connection made successfully")
    })
    .catch(err=>{
        throw err;  
});






app.get('/',routes.mainPage);
app.get('/data',routes.explore);
app.post('/add',routes.add);
app.delete('/delete',routes.delete);
app.post('/image',upload.single('image1'),routes.image);




app.listen(3030,function(){    
    console.log("Connected to "+3030);
});

