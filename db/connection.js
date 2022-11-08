const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("Datebase is now connected");
  } catch (error) {
    console.log(` There is an Error While Connecting DB: ${error}`);
  }
};
module.exports = connection;
