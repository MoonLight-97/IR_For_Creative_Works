const {Schema, model, Types} = require('mongoose')

const comment = new Schema({
    authors: [{type: Types.ObjectId}],
    work: {type: Types.ObjectId, required: true, unique: true, ref: "Work"},
    contents: [{type: String}],
    count: Number
})

module.exports = model('Comment', comment)