const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const FormData = require("form-data");
const fs = require("fs");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env",
});
const app = express();
// Import models
const User = require("./model/users");
const Product = require("./model/products");

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.engine("handlebars", hbs());
app.set("view engine", "handlebars");

app.get("/", (_req, res) => {

    res.render("home", {
        text: "Welcome",
        showHeader: true,
    });
});

app.get("/signin", (req, res) => {
    res.render("sign", {
        title: "sign in",
        username: "username",
        password: "password",
        first_name: "first name",
        surname: "surname",
        image: "add a picture",
        submit: "submit",
    });
});

app.post("/signin", (req, res) => {
    const { username, password, firstName, surname } = req.body;
    const form = new FormData();
    const image = form.append("image").value;

    console.log(username, password, firstName, surname, image);

    // await User.create({ username, password, firstName, surname, image });

    res.render("home");
})

app.get("/login", (req, res) => {
    // let isConnected = false;
    // const { username, password } = req.body;

    res.render("login", {
        title: "L O G I N",
        username: "username",
        password: "password",
        login: "login",
        account: "Create an account here",
    });
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    res.render("home");
});

app.get("/cities", (req, res) => {
    res.render("cities", {
        title: "cities",
        paris: "paris",
        lyon: "lyon",
        marseille: "marseille",
    });
});

app.get("/cities/paris", (req, res) => {
    // const cities = await Product.find({ city: "Paris "});

    res.render("/paris", {
        title: "Paris",
    });
});

app.get("/cities/lyon", (req, res) => {
    // const cities = await Product.find({ city: "Lyon "});

    res.render("/lyon", {
        title: "Lyon",
    });
});

app.get("/cities/marseille", (req, res) => {
    // const cities = await Product.find({ city: "Marseille "});

    res.render("/marseille", {
        title: "Marseille",
    });
});

app.get("/products", async (req, res) => {
    const products = await Product.find();

    res.render("productList", {
        text: products,
    });
});

app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    res.render("products", {
        text: product,
    });
});

app.get("/add-product", async (req, res) => {
    const { name, price, city, description, image } =
        await Product.create({ name, price, city, description, image });

    res.render("addProduct", {

    });
});

app.get("/profil", (async (req, res) => {
    const username = "";
    const user = await User.find({ username });

    res.render("profil", {

    });
}));

// Starting server
app.listen(process.env.PORT, () => {
    console.log("Server started, listening on PORT", process.env.PORT);
});
