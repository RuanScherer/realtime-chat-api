const { Schema, model } = require('mongoose')

const MessageSchema = new Schema({
	from:  {
		_id: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		}
	},
	to: {
		_id: { type: String },
		username: { type: String }
	},
	content: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})
export default model('Message', MessageSchema)