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

const CinemaClusterModel = new Schema({
    CinemaClusterName: {
        type: String,
        required: [true, 'Nhap ten rap']
    },
    Address: {
        type: String,
        required: [true, "Nhap dia chi"]
    },
    Hotline: {
        type: Number,
        required: [true, "Nhap so dien thoai"]
    },
    Email: {
        type: String,
        required: [true, "Nhap email"]
    },
    Website: {
        type: String,
    },
    Cinemas: [{
        type: Schema.Types.ObjectId,
        ref: 'cinema',
        default: null,
    }],
    CinemaImage: {
        type: Schema.Types.ObjectId,
        ref: 'image',
        default: null,
    },
    Content: {
        type: String,
        required: [true, 'nhan xet ve rap chua co']
    },
    FareImage: {
        type: Schema.Types.ObjectId,
        ref: 'image',
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('cinemaCluster', CinemaClusterModel)
