/**
 * Tao model voi cac thuoc tinh 
 * cinema name  #
 * location     #
 * contact      #
 * cinema image
 * content
 * fare image
 * isDeleted
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const CinemaModel = new Schema({
    CinemaName: {
        type: String,
        required: [true, 'Nhap ten rap']
    },
    Address: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('cinema', CinemaModel)
