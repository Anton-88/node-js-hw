const { Schema } = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
})

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password)
}

module.exports = userSchema