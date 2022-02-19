const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    users: [{type: Types.ObjectId, ref: "User"}],
    work: {type: Types.ObjectId, required: true, unique: true, ref: "Work"},
    count: {type: Number, required: true}
})

module.exports = model('Like', schema)