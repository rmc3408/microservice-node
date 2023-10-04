import mongoose from 'mongoose'
import { Password } from '../services/hashing'

interface IUser {
  email: string
  password: string
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        delete ret.__v
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

const User = mongoose.model<IUser>('User', userSchema)

export default User
