const mongoose = require('mongoose')
const Schema = mongoose.Schema


const serieSchema = new Schema({
    title: {
        type: String,
        required: "Series title is required",
        trim: true
    },
    image: String,
    description: String,
    platform: {
        type: String,
        enum: [
         "Movistar+",
         "HBO Max", 
         "Netflix", 
         "Amazon Prime", 
         "Disney+", 
         "Apple TV", 
         "Others"]
    },
    status: {
        type: String,
        enum: [
        "Finished", 
        "Still running"]
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    }
})

const Serie = mongoose.model("Serie", serieSchema)
module.exports = Serie