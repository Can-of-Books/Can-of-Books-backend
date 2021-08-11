const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  status: { type: String },
  img_url: { type: String }
});

const userSchema = new mongoose.Schema({
  email: { type: String },
  books: [bookSchema]

});


const bookModel = mongoose.model("Book", userSchema);

const seedUserBooks = () => {
  try {
    const userBook = new bookModel({
      email: "vipmoh88@gmail.com",
      books: [{
        title: "Big Dream",
        description: "A book talks about how to stay ambitious and committed to your dreams",
        status: "Book",
        img_url: "https://images-na.ssl-images-amazon.com/images/I/61D+Om-+MvL._RI_.jpg"
      },
      {
        title: "Earn Money",
        description: "A book talks about how to earn money",
        status: "Story",
        img_url: "https://2aszhi3llh0x466uws21w6cc-wpengine.netdna-ssl.com/wp-content/uploads/Fast-Ways-To-Earn-Money-Online-Helpful-Tips-For-The-Unemployed.jpg"
      },
      {
        title: "Be Happy",
        description: "The secret of a happy life",
        status: "Book",
        img_url: "https://dbdzm869oupei.cloudfront.net/img/sticker/large/13639.jpg"
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
