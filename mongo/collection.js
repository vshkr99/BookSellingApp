let mongoose=require('mongoose');

let collectionSchema=new mongoose.Schema({
        partNo:String,
        Name : String,
        Quantity:Number,
        RefNo: Number
    },
    {
        collection:'customers'
});

module.exports=mongoose.model('collectionSchema',collectionSchema);