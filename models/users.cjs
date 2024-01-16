const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SALT_ROUNDS = 6;
const userSchema = new Schema({
    username: {type: String, required: true, unique:true},
    password: {type: String,trim: true,minLength: 3,required: true }
});

module.exports = mongoose.model('User', userSchema);