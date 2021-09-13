d3 = require("d3@6");
data = d3.json('patient.json',function(err, data){
    console.log(data)
    return data ;
})