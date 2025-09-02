const mongoose = require('mongoose')
const bcrypt = require ("bcrypt")
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] },
    password: { type: String, required: true, minlength: 8 },
   /*password: { type: String, required: true, minlength: 8, match: [
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#\$%\^&\*]).{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number or symbol, and be at least 8 characters long.'
  ] },*/
    role: { type: String, enum: ['member', 'coach', 'admin'] },
    age: Number,
    phone: String,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    isActive: Boolean,
    user_Image: { type: String, required: false, default: 'client.png' },
    cars : [{type: mongoose.Schema.Types.ObjectId, ref :'Car'}]
}, {timestamps: true});



userSchema.pre('save', async function(next){
  try {

    const salt = await bcrypt.genSalt()
    const User = this
    User.password= await bcrypt.hash(User.password, salt)
    User.isActive = false

    next()
    
  } catch (error) {
    next(error)
  }

})

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email})
  if (user){
    const auth = await bcrypt.compare (password, user.password) 
    if (auth){
      return user
    }
    throw new error ("incorrect password");

  }
  throw new error ("incorrect email");
}
const User = mongoose.model('User', userSchema)
module.exports = User ;
