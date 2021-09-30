const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
        required: false,
    },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;