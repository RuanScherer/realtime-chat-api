const { Schema, model } = require('mongoose')

const MessageSchema = new Schema({
	username:  {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})
export default model('Message', MessageSchema)