const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes/route");
const ejs = require("ejs");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);
mongoose
  .connect(
    "mongodb+srv://admin-ahsan:ahsan123@cluster0.5mqbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database.");
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => {
    console.log(err);
  });
