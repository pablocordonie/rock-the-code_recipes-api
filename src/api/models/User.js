const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, trim: true, required: true, unique: true },
        email: { type: String, trim: true, required: true, unique: true },
        password: { type: String, trim: true, required: true },
        birthyear: { type: Number, trim: true, required: true },
        role: { type: String, trim: true, required: true, enum: ['admin', 'user'], default: 'user' },
        profileImage: { type: String, trim: true, required: false }
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;