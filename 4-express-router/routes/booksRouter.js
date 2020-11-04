const booksRouter = require('express').Router();

const NotFoundError = require('../utils/errors/NotFoundError');

const Book = require('../../models/books');

booksRouter.route('/')
  .get((req, res, next) => {
    const { search } = req.query;
    console.log({ search });
    const books = Book.getAll();
    if (!search) {
      return res.json({ books });
    }

    const searchResults = books.filter(book => (book.title.toLowerCase().includes(search)));

    if (!searchResults.length) {
      throw new NotFoundError('No books were found matching the given query');
    }

    res.json({ books: searchResults });
  });

booksRouter.route('/:id')
  .all((req, res, next) => {
    const book = Book.get(+req.params.id);
    if (!book) {
      throw new NotFoundError('Book not found');
    }
    res.locals.book = book;
    next();
  })
  .get((req, res, next) => {
    res.json(res.locals.book);
  })
  .patch((req, res, next) => {
    const newFields = req.body;
    console.log({ newFields });
    const newBook = Book.update(res.locals.book.id, { ...res.locals.book, ...newFields });
    res.json(newBook);
  })
  .put((req, res, next) => {
    const newFields = req.body;
    const newBook = Book.update(res.locals.book.id, { ...newFields });
    res.json(newBook);
  })
  .delete((req, res, next) => {
    const deletedBook = Book.delete(res.locals.book.id);
    res.json(deletedBook);
  });

module.exports = booksRouter;