const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] },
    password: { type: String, required: true, minlength: 8, match: [
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#\$%\^&\*]).{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number or symbol, and be at least 8 characters long.'
  ] },
    role: { type: String, enum: ['member', 'coach', 'admin'] },
    age: Number,
    phone: String,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    isActive: Boolean,
    user_Image: { type: String, required: false, default: 'client.png' },
    //for members
    height: Number,
    weight: Number,
    goals: String,
    // for coachs
    certifications: [String],
    bio: String,
    //for admins
    permissions: Object,
});
/* permissions: {
    canAccessGym: { type: Boolean, default: true },   // Accès salle
    canBookClasses: { type: Boolean, default: false }, // Réservation cours
    canManageUsers: { type: Boolean, default: false }, // Gestion des utilisateurs
    canManageClasses: { type: Boolean, default: false }, // Gérer planning
    maxGuests: { type: Number, default: 0 }             // Invités autorisés
  }
}, { timestamps: true });

// Middleware : attribuer automatiquement des permissions selon le rôle
userSchema.pre('save', function(next) {
  if (this.isNew) {
    if (this.role === 'member') {
      this.permissions = {
        canAccessGym: true,
        canBookClasses: true,
        canManageUsers: false,
        canManageClasses: false,
        maxGuests: 1
      };
    } else if (this.role === 'coach') {
      this.permissions = {
        canAccessGym: true,
        canBookClasses: true,
        canManageUsers: false,
        canManageClasses: true,
        maxGuests: 5
      };
    } else if (this.role === 'admin') {
      this.permissions = {
        canAccessGym: true,
        canBookClasses: true,
        canManageUsers: true,
        canManageClasses: true,
        maxGuests: 99
      };
    }
  }
  next();
});*/
const User = mongoose.model('User', userSchema)
module.exports = User ;
