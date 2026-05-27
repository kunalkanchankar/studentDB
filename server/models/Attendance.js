const mongoose=require("mongoose");

const AttendanceSchema=new mongoose.Schema({

studentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Student"
},

studentName:String,

course:String,

date:{
type:Date,
default:Date.now
},

status:{
type:String,
enum:["Present","Absent"]
}

});

module.exports=
mongoose.model(
"Attendance",
AttendanceSchema
);