const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  status: { type: String },
});

const userSchema = new mongoose.Schema({
  email: { type: String },
  books: [bookSchema]

});


const bookModel = mongoose.model("Book", userSchema);

const seedUserBooks = () => {
  try {
    const userBook = new bookModel({
      email: "alhillosarah@gmail.com",
      books: [{
        title: "Big Dream",
        description: "A book talks about how to stay ambitious and committed to your dreams",
        status: "Book",
      },
      {
        title: "Earn Money",
        description: "A book talks about how to earn money",
        status: "Story",
      },
      {
        title: "Be Happy",
        description: "The secret of a happy life",
        status: "Book",
      }]

    });

    userBook.save();

  } catch (error) {
    console.log("Error while creating the user: ", error.message);
  }
};


module.exports = {
  bookModel,
  seedUserBooks
};
