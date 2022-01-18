const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var favorites = [];

function Book(index, title, author, id) {
    this.index = index;
    this.title = title;
    this.author = author;
    this.id = id;
}

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.listen(3000);

console.log("Initialising server");

// managing CORS
app.options('*', cors()); // include before other routes 
app.use(cors());

app.get('/', (req, res) => {
    console.log("Get request submitted");
    res.send(favorites);
});

app.post('/', (req, res) => {
    console.log("Post request submitted");

    var book = new Book(req.body.index, req.body.title, req.body.author, req.body.id);
    favorites.push(book);
})