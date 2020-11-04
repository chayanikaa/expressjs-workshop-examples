const http = require('http');

const express = require('express');

const Book = require('../models/books');

const app = express();

app.get('/api/books', (req, res, next) => {
  const { search } = req.query;
  console.log(req.query);
  const books = Book.getAll();
  if (!search) {
    return res.json({ books });
  }

  const processedSearch = search && search.toLowerCase();
  const searchResults = books.filter(book => (book.title.toLowerCase().includes(processedSearch)));

  if (!searchResults.length) {
    return res.status(404).json({ message: 'No books were found matching the given query' });
  }

  res.json({ books: searchResults });
});

app.get('/api/books/:id', (req, res, next) => {
  console.log(req.params);
  const book = Book.get(+req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

http.createServer(app).listen(3000, () => {
  console.log('Server is listening on port: 3000');
});
