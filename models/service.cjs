const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const serviceSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    servicetype: {type: String, required: true},
    cellphone: {type: String,required: true,quniqe: true}
});

module.exports = mongoose.model('Service', serviceSchema);