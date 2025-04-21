const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Atributes of the adminUser collection
const adminUser = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    pin: { type: Number, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true },
    dateBirth: { type: String, required: true },
    state: { type: String, enum: ['Pending', 'Active'], default: 'Pending' },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String }
});

//Exports the model on our data base and create a new collection 
module.exports = mongoose.model('AdminUser', adminUser);