
const { bookModel } = require('../models/book.model');



const getBooks = async (req, res) => {
    const { email } = req.query;

    bookModel.findOne({ email: email }, (err, userBooks) => {

        if (err) {
            res.send('No User Found');
        } else {

            res.json(userBooks);
        }
    });
}


const createBook = async (req, res) => {

    const { email,
        title,
        description,
        status,
        img_url } = req.body;

    const newBookObj = new bookModel({
        email: email,
        title: title,
        description: description,
        status: status,
        img_url: img_url
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