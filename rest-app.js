const http = require('http');
var MongoClient = require('mongodb').MongoClient;
var configItems = require('./config');
const express = require('express');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const hostname = '127.0.0.1';
const port = 3000;
//default port to listen and to start server
app.listen(3000, () => console.log('Example app listening on port 3000!'))
//Default Node App
app.get('/index', (req, res) => {
    console.log('get method called')
    res.send('Hello..you came to the default page!');
});


app.post('/insert-one-publisher', (req, res) => {

    var uri = configItems.storageConfig.mongo_uri;
    console.log(uri);
    var response = new Array();
    MongoClient.connect(uri, function (err, client) {
        console.log("Request body " + JSON.stringify(req.body));
   

        var publisherDetails= req.body;
        console.log(publisherDetails.name);
        
        const books_collection = client.db("books-db").collection("publisher");
           books_collection.insertOne(publisherDetails, function (err, dbres) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    console.log("1 document inserted" + res.insertedCount);
                    res.json(dbres.insertedCount);
                }
                client.close();
    
            });

    })
});


//Promise Method Implementation:
function callDatabasePromise(){

    return new Promise(function(resolve,reject){
        
    })
}




app.get('/all-publishers', (req, res) => {
    //Insert Publisher Data to Mongo DB
    var uri = configItems.storageConfig.mongo_uri;
    console.log(uri);
    var promise = new callDatabasePromise(function(result){

    },function(err){

    });
    var response = new Array();
    MongoClient.connect(uri, function (err, client) {
        const collection = client.db("books-db").collection("publisher");
        var cursor = collection.find();
        var counter = 0;
        var findRecordCount = cursor.count(function (err, count) {
            length = count;
            console.log("find count >>" + count);
        });
        cursor.forEach(function (doc, err) {

            response.push(doc);
            if (err) console.log(err);
            counter = counter + 1;
            console.log("Counter Value " + counter);
            console.log("Array Lenght " + length);
            if (counter == length) {
                sendResponse(response);
            }
        })
        // console.log(collection);
        // perform actions on the collection object
        client.close();
    });

    function sendResponse(local_response) {
        res.json(local_response);
        console.log('completed forEach');
    };


});
