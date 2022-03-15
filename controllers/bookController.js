const {Book} = require('../models');
const genres = ['Science Fiction', 'Fiction', 'Fantasy', 'Horror'].sort();

//view all
module.exports.viewAll = async function(req, res){
    const books = await Book.findAll();
    res.render('books/view_all', {books});
};
//profile
module.exports.viewProfile = async function(req, res){
    const book = await Book.findByPk(req.params.id);
    res.render('books/profile', {book})
};
//render add form
module.exports.renderAddForm = function(req, res){
    const book = {
        title: '',
        author: '',
        publisher: '',
        genre: genres[0],
        pageCount: '',
        cover: '',
        description: ''
    };
    res.render('books/add', {book, genres});
};
//add
module.exports.addBook = async function(req, res){
    const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        genre: req.body.genre,
        pageCount: req.body.pageCount,
        cover: req.body.cover,
        description: req.body.description
    });
    res.redirect(`/books/profile/${book.id}`);
};
//render edit form
module.exports.renderEditForm = async function(req, res){
    const book = await Book.findByPk(req.params.id);
    res.render('books/edit', {book, genres});
};
//update
module.exports.updateBook = async function(req, res){
    const book = await Book.update({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        genre: req.body.genre,
        pageCount: req.body.pageCount,
        cover: req.body.cover,
        description: req.body.description
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/courses/profile/${req.params.id}`);
};
//delete
module.exports.deleteBook = async function(req, res){
    await Book.destroy({
        where:{
            id:req.params.id
        }
    });
    res.redirect('/books');
};