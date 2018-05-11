var fs = require('fs'),
    configPath = './config.json';

booksDataFilePath = './books-data.json'
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));

var parsed_booksdata = JSON.parse(fs.readFileSync(booksDataFilePath, 'UTF-8'));
exports.storageConfig = parsed;
exports.booksData = parsed_booksdata;