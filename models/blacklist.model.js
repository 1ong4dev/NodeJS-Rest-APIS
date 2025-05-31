const mongoose = require('mongoose');
const blacklistSchema = new mongoose.Schema({
    token: String,
    expireAt: Date
});


module.exports = mongoose.model('Blacklist', blacklistSchema);