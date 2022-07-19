const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_PATTERN = /.{8,}$/
const WORK_FACTOR = 10;


const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, "This name is already used"],
    trim: true,
    required: "Username is required",
    lowercase: true,
    maxLength: [15, "Username should have less than 15 chars"],
    minLength: [3, "Username should have at least 3 chars"],
},
  email: {
    type: String,
    required: "Email is required",
    trim: true,
    lowercase: true,
    unique: true,
    match: [EMAIL_PATTERN, "Invalid email"]
},
  bio: {
    type: String,
    maxLength: [100, "Describe yourself in less than 100 chars, please"],
},
  password: {
    type: String,
    required: "Password is required",
    match: [PWD_PATTERN, "Password need at least 8 chars"]
    },
});


userSchema.pre("save", function(next) {
    if(this.isModified("password")) {
        bcrypt.hash(this.password, WORK_FACTOR)
            .then(hash => {
                this.password = hash
                next()
            })
            .catch(error => next(error))
    } else {
        next()
    }
})


const User = mongoose.model("User", userSchema);
module.exports = User;
