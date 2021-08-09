const mongoose = require("mongoose");
const bookSchema = require("./Book.schema");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  books: [bookSchema],
});

const userModel = mongoose.model("Book", userSchema);

const seedUserBooks = () => {
  try {
    const user = new userModel({
      email: "alhillosarah@gmail.com",
      books: [
        {
          title: "Big Dream",
          description: "A book talks about how to stay ambitious and commited to your dreams ",
          status: " ",
        },
        {
          title: "Earn Money",
          description: "A book talks about how to earn money",
          status: " ",
        },
        {
          title: "Be Happy",
          description: "The secret of a happy life ",
          status: " ",
        },
      ],
    });

    user.save();
  } catch (error) {
    console.log("Error while creating the user: ", error.message);
  }
};

module.exports = {
  userModel,
  seedUserBooks,
};
