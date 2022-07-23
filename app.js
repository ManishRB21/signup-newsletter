const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https");
const app= express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html');
  });

  app.post('/',function(req,res){

  const firstName=req.body.fName;
  const lastName=req.body.lName;
  const email=req.body.email;
  

  var data={
    members:[
    {
        email_address:email,
        status:"subscribed",
        merge_fields:{
        
          FNAME:firstName,
          LNAME:lastName
        }
    }
    ]
};

const jsonData=JSON.stringify(data);
const url='https://us10.api.mailchimp.com/3.0/lists/f1a27d7110';

const options = {
    method :'POST',
    auth: 'mrb:0d23eb4531003871885623c90d2f27b6-us10'
}

const request=https.request(url, options, function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname+'/success.html');
      }
    else{
        res.sendFile(__dirname+'/failure.html');
      }


    response.on('data', function(data){
        console.log(JSON.parse(data));
    })
});

request.write(jsonData);
request.end();
});

app.post('/failure',function(req,res){
    res.redirect('/');
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
 
app.listen(port, function() {
  console.log("Server started succesfully");
});  

//0d23eb4531003871885623c90d2f27b6-us10
//f1a27d7110