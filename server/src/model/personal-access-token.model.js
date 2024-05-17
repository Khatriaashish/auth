const mongoose = require('mongoose');
const PATSchemaDef = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
    token: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

const PATModel = mongoose.model('PAT', PATSchemaDef);
module.exports = PATModel;