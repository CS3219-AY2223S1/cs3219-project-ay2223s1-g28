import mongoose from 'mongoose';
var Schema = mongoose.Schema
let QuestionModelSchema = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    // Specified to be an array of string.
    // For each categories, place them in a bubble as shown in the roomPage.
    // categories: [{
    //     type: String,
    // }],
    difficulty: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    }
})

export default mongoose.model('QuestionModel', QuestionModelSchema)
