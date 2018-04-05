const path = require('path');
const express = require('express');

var app = express();
const port = process.env.PORT || 3000;
var public_path = path.join( __dirname , '../public');
app.use(express.static(public_path));

app.listen(port,()=>{
console.log("Listening on port 3000");
});