const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'is required'],
        unique: true,
        trim: true,
        maxlength: [30, 'cannot be longer than 30 characters']
    },
    description: {
        type: String,
        required: [true, 'is required'],
        trim: true,
        maxlength: [250, 'cannot be longer than 250 characters']
    }
})

module.exports = mongoose.models.Notes || mongoose.model('Notes', notesSchema)