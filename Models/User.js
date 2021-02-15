const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
    },
    prenom: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true, 
    },
    role:{
        type: String,
        default: 'superuser' 
    },
    direction:{
        type: String,
        default: 'dre' 
    },
    password: {
        type: String,
        required: true,
    },
    deleted: { type: Boolean, default: false },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
});

module.exports = mongoose.model('User', userSchema);
