// import our modules
var http		= require( 'http' );
let express = require('express');
const app = express();
const srv = http.createServer(app);
app.use(express.static(__dirname + '/'));

 // create our basic server
srv.listen(port);
console.log("Running server on", port);