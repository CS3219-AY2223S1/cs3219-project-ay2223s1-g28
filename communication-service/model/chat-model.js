import mongoose from 'mongoose';
var Schema = mongoose.Schema;
let ChatModelSchema = new Schema({
	rid: {
		type: String,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	},
	sender: {
		type: String,
		required: true,
	},
	receiver: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
});

ChatModelSchema.index({ rid: 1, index: 1 }, { unique: true });

export default mongoose.model('ChatModel', ChatModelSchema);
