const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let requiredValidationMessage = "{PATH} is required";


let gemstoneSchema = new Schema({
    name: {
        type: String,
        require: requiredValidationMessage,
        unique: true
    },
    description: {
        type: String,
        require: requiredValidationMessage
    },
    image: {
        type: String,
        require: requiredValidationMessage
    },
    price: {
        type: Number,
        require: requiredValidationMessage
    },
    quantity: {
        type: Number,
        require: requiredValidationMessage
    }
});

mongoose.model("Gemstone", gemstoneSchema);
let Gemstone = mongoose.model("Gemstone");

module.exports = Gemstone;