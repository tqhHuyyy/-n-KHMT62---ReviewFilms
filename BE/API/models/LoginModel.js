var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const LoginModel = new Schema({
    Username: {
        type: String,
        required: [true, 'Nhap tai khoan'],
    },
    Password: {
        type: String,
        required: [true, 'Nhap pass']
    },
    Hint: {
        type: String
    }
}, { collection: 'login' })


module.exports = mongoose.model('login', LoginModel)
