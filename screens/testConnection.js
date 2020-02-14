/*const mongoose = require('mongoose');
//Connect to mongoDB
mongoose.connect('mongodb+srv://guzel:LifeLog2020@cluster0-rbmrz.mongodb.net/test?retryWrites=true&w=majority');

mongoose.connection.once('open', function(){
    console.log('Connection is done!');
}).on('error', function(error){
    console.log('Connection Error', error);
});*/
//https://docs.mongodb.com/manual/reference/method/js-collection/
/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://guzel:LifeLog2020@cluster0-rbmrz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("first-test").collection("users");
  collection.insertOne({$inc: {integer: 1}});
  client.close();
});*/
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://guzel:LifeLog2020@cluster0-rbmrz.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("first-test");
  var myobj = { name: "Water Bottle"};
  var newValues = {$inc: {taps: 1}};
  dbo.collection("users").updateOne(myobj, newValues, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
