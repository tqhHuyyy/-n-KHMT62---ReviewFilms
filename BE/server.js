/**
 * Thiet lap multer, morgan, path
 * Them cac model vao
 * thiet lap server
 */

var express = require('express'),
    app = express(),
    cors = require('cors'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    path = require('path'),
    Film = require('./API/models/FilmModel'),
    Cinema = require('./API/models/CinemaModel'),
    Actor = require('./API/models/ActorModel'),
    Image = require('./API/models/ImageModel'),
    port = process.env.port || 3010;

// app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({
    allowedHeaders: '*',
    origin: '*',
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'))
app.use(multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.join(__dirname, 'public/images'))
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        },
    })
}).any())

//Ket noi mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/Movielntroduce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to mongodb success !!!');
}).catch((err) => {
    console.log(err);
})

var routes = require('./API/routes');
routes(app)

app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + String.fromCharCode(160) + 'not found' })
})

app.listen(port);
console.log(`Server with port ${port} is ready to run`);