const http = require('http');

const express = require('express');

const booksRouter = require('./routes/booksRouter');

const app = express();

// Built in middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

// Custom middleware
app.use((req, res, next) => {
  if (req.query.search) {
    console.log({ search: req.query.search });
    req.query.search = req.query.search.toLowerCase();
  }
  next();
});

app.use('/api/books', booksRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message });
});

http.createServer(app).listen(3000, () => {
  console.log('Server is listening on port: 3000');
});