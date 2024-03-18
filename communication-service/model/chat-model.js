import mongoose from 'mongoose';
var Schema = mongoose.Schema;
let ChatModelSchema = new Schema({
	rid: {
		type: String,
		required: true,
	},
	sender: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
});

export default mongoose.model('ChatModel', ChatModelSchema);
