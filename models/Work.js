const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    status: {type: String, required: true},
    janr: {type: String, required: true},
    size: {type: String, required: true},
    user: {type: Types.ObjectId, ref: "User"}
})

module.exports = model('Work', schema)