import React,
{
useEffect,
useState
}
from "react";

import axios from "axios";

function AttendanceReport(){

const [report,setReport]=
useState([]);

useEffect(()=>{

fetchData();

},[]);


const fetchData=
async()=>{

const res=
await axios.get(
"http://localhost:5000/attendance-report"
);

setReport(
res.data
);

};


const grouped={};

report.forEach(item=>{

if(!grouped[item.studentName]){

grouped[item.studentName]={

present:0,
total:0

};

}

grouped[item.studentName]
.total++;

if(item.status==="Present"){

grouped[item.studentName]
.present++;

}

});


return(

<div>

<h2>

Attendance Report

</h2>

{

Object.keys(grouped)
.map(name=>{

const total=
grouped[name].total;

const present=
grouped[name].present;

const avg=
(
present/total*100
).toFixed(2);

return(

<div
className="student-card"
key={name}
>

<h3>

{name}

</h3>

<p>

Total Days:
{total}

</p>

<p>

Present:
{present}

</p>

<p>

Attendance:
{avg}%

</p>

</div>

)

})

}

</div>

)

}

export default AttendanceReport;