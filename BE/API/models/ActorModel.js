/**
 * Tao model voi cac thuoc tinh: 
 * actor name   #
 * stage name
 * age
 * image
 * cinema image
 * isDeleted
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const ActorModel = new Schema({
    ActorName: {
        type: String,
        required: [true, 'Nhap ten dien vien'],
    },
    Age: {
        type: Number,
    },
    Image: {
        type: Schema.Types.ObjectId,
        ref: 'image',
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('actor', ActorModel)
