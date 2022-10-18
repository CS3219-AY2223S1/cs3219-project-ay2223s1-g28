import mongoose from 'mongoose';
var Schema = mongoose.Schema;
let ChatModelSchema = new Schema({
    rid: {
        type: ObjectId,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
    sender: {
        type: ObjectId,
        required: true,
    },
    receiver: {
        type: ObjectId,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

ChatModelSchema.index({ rid: 1, index: 1 }, { unique: true });

export default mongoose.model('ChatModel', ChatModelSchema);