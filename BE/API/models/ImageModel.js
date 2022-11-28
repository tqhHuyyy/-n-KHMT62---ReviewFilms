/**
 * url
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ImageModel = new Schema({
    ImageName: {
        type: String
    },
    Url: {
        type: String,
        required: [true, 'url cua anh']
    },
    ImageId: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('image', ImageModel)
