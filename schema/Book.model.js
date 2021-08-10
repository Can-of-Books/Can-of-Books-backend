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
      email: "Amneh99el@gmail.com",
      books: [
        {
          title: "Big Dream",
          description: " ",
          status: " ",
        },
        {
          title: "Earn Money",
          description: " ",
          status: " ",
        },
        {
          title: "Be Happy",
          description: " ",
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
