
const bookModel = require('../models/book.model');



const getBooks = async (req, res) => {
    const { email } = req.query;

    bookModel.find({ email: email }, (err, userBooks) => {

        if (err) {
            res.send('No User Found');
        } else {
          
            res.send(userBooks);
        }
    });
}


const createBook = async (req, res) => {

    const { email,
        title,
        description,
        status } = req.body;

    const newBookObj = new bookModel({
        email: email,
        title: title,
        description: description,
        status: status
    });
    newBookObj.save();

    res.json(newBookObj);
}

const deleteBook = async (req, res) => {

    const bookId = req.params.book_id;

    bookModel.deleteOne({ _id: bookId }, (error, deleted) => {
        res.send(deleted);
    })
}

module.exports = {
    getBooks,
    createBook,
    deleteBook
}