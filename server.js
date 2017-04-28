var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Job = require('./api/models/jobQueueModel'),
  control = require('./api/controllers/jobQueueController'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/jobQueueRoutes');
routes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);


//TEST Queue functionality 
var id = 0;
var varCounter = 0;
var varName = function(){
     if(varCounter < 10) {
          varCounter++;
          /* your code goes here */
     } else {
     	// console.log(id);
          clearInterval(id);
     }
 };

id = setInterval(function (){
 control.create_a_job({body: {url: "https://www.google.com/"}}, 0);
 varName();
}, 200);

