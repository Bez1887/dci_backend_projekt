const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/users");

const productsRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const port = process.env.PORT || 3000;
dotenv.config();

app.get("/api/test", () => {
  console.log("test war erfolgreich");
});

const datenbank = mongoose
  .connect("mongodb://localhost:27017/projekt")
  .then(() => console.log("connected to MongoDB"))
  .catch((err) =>
    console.log("error connecting to db", { message: err.message })
  );

/////

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/products", productsRoute);

app.use("/api/orders", orderRoute);

/////
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
