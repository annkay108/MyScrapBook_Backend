const mongoose = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, default: "no title"},
    date: {type: Date, default: Date.now},
    body: {type:String, required: true}
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;