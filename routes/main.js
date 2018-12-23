var fs=require('fs');
const Collection=require('./../mongo/collection');


exports.main={
    jsonPage : function(req,res){
                fs.readFile('package.json',(err,data)=>{
                if(err) throw err;
                res.write(data);
                res.end();
                });
            },
    mainPage: function(req,res){
                    res.sendFile('/main.html',{root: __dirname+'/../'});
                },
    explore : function(req,res){
                Collection.find({})
                .exec(function(err,data){
                    if(err) throw err;
                    console.log(data);
                    res.json(data);
                })
            },
    
    add :   (req,res)=>{
            //console.log(req.body.name);
            var item=req.body;
            Collection.insertMany([
                {partNo : 'A00005',Name : item.name, Quantity: item.quantity, RefNo: item.refNo}
            ],function(err,response){
                if(err) throw err;
                console.log(response);
                res.json({'send':'success'});
            })
        },

    delete: (req,res)=>{
        var item=req.body;
        Collection.deleteOne(item.it,function(err,response){
            if(err) throw err;
            console.log(response);
            res.json({'remove': 'success'});
        })
    },

    image: (req,res)=>{
        console.log(req.body.file);
        console.log("uploaded");
        res.json({image: 'success'});
    }


    
};



