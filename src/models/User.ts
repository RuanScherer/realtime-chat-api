import { Schema, Document, model } from 'mongoose'

interface IUser extends Document {
	username: string
	password: string
}

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		select: false
	}
})

export default model<IUser>('User', UserSchema)