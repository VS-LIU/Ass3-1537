const mongoose = require("mongoose"); // Import mongoose

// Create a new mongoose schema
const unicornSchema = new mongoose.Schema({
    // empty schema 
});

// Create a new mongoose model
const unicornModel = mongoose.model('unicorns', unicornSchema);

module.exports = unicornModel;