const http = require('http');
var MongoClient = require('mongodb').MongoClient;
var configItems = require('./config');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

var uri = configItems.storageConfig.mongo_uri;
console.log(uri);
MongoClient.connect(uri, function (err, client) {
    //INserting a collection
    var myobj = {
        "author": ["Brian P. Hogan"],
        "isbn": "978-1-93435-668-5", "price": { "currency": "USD", "discount": 21.78, "msrp": 33 },
        "publicationYear": 2010, "tags": ["html5", "cascading style sheets", "css", "html",
            "pragmatic programmer", "silverlight", "web development", "web standards", "css3", "foo"],
        "title": "HTML5 and CSS3"
    };

    var allBooksdata =configItems.booksData;
   // console.log(allBooksdata);
    const books_collection = client.db("books-db").collection("books");
    books_collection.insertMany(allBooksdata, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted" + res.insertedCount);
        client.close();
    });



    //Reading records from Collection
    const collection = client.db("books-db").collection("publisher");
    var cursor = collection.find();
    cursor.forEach(function (doc, err) {

        console.log(doc);
        console.log(err);
    })
    // console.log(collection);
    // perform actions on the collection object
    client.close();
});