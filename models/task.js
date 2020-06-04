const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: { type: String, require: true },
    owner: { type: String, require: true },
    done: { type: Boolean, require: true, default: false }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task; 