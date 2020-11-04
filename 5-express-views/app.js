const http = require('http');

let express = require('express');

const Book = require('../models/books');

let app = express();

app.set('view engine', 'ejs');

app.get('/books', (req, res) => {
  const books = Book.getAll();
  res.render('books', { books });
});

app.get('/books/:id(\\d+)', (req, res, next) => {
  console.log(req.params);
  const book = Book.get(+req.params.id);
  if (!book) {
    return next('route');
  }
  res.render('book', { book });
});

app.use((req, res) => {
  res.render('404', { path: req.path });
});

http.createServer(app).listen(3000, () => {
  console.log('Server is listening on port: 3000');
})
