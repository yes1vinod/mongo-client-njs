const http = require('http');
var MongoClient = require('mongodb').MongoClient;

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




var uri = "mongodb+srv://new-user_1:April2018@cluster0-geugd.mongodb.net/books-db?retryWrites=true";
MongoClient.connect(uri, function (err, client) {
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