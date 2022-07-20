const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    adminName: { type: String },

    phoneNo: { type: Number },

    email: { type: String, unique: true, lowercase: true },

    password: { type: String, required: true },

    cpassword: { type: String, required: true }
}, { timestamps: true })

const admin = mongoose.model('admin', adminSchema)
module.exports = admin