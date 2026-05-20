const mongoose=require("mongoose");

const StudentSchema=
new mongoose.Schema({

name:String,
age:Number,
course:String,
image:String

});

module.exports=
mongoose.model(
"Student",
StudentSchema
);