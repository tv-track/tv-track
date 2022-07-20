const mongoose = require('mongoose')
const Schema = mongoose.Schema


const serieSchema = new Schema({
    title: {
        type: String,
        required: "Series title is required",
        trim: true
    },
    image: {
        type: String,
        validate: {
            validator: function(image) {
                try {
                    new URL(image)
                    return true
                } catch(error) {
                    return false
                }
            },
            message: (image) => "Invalid URL"
        }
    },
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

serieSchema.pre("validate", function(next) {
    this.image = this.image || undefined
    this.description = this.description || undefined
    next()
})

const Serie = mongoose.model("Serie", serieSchema)
module.exports = Serie