/**
 * Tao model voi cac thuoc tinh:
 * film name String   #
 * director: String
 * writer: String
 * production: String
 * Actors: [ref] #
 * cinemas: [ref] #
 * genre: [ref] #
 * runningtime: number  #
 * release date: String     #
 * review content: String   #
 * tag: String
 * cover image: ref
 * poster image: ref    #
 * images: [ref]
 * score: [{}]
 * trailerURL: String
 * National: String
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilmSchema = new Schema({
  FilmName: {
    type: String,
    required: [true, 'nhap ten phim'],
  },
  Director: {
    type: String,
  },
  Writer: {
    type: String,
  },
  Production: {
    type: String,
  },
  Actors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'actor',
      require: [true, 'Khong co dien vien'],
    },
  ],
  Cinemas: [
    {
      type: Schema.Types.ObjectId,
      ref: 'cinemaCluster',
      require: [true, 'Khong co rap'],
    },
  ],
  Genres: [
    {
      type: String,
      require: [true, 'Khong co the loai'],
    },
  ],
  RunningTime: {
    type: Number,
    required: [true, 'Nhap thoi gian phim'],
  },
  ReleaseDate: {
    type: Date,
    required: [true, 'nhap ngay ra mat nao'],
  },
  ReviewContent: {
    type: String,
    required: [true, 'Khong co review a ????'],
  },
  Rated: {
    type: String,
  },
  CoverImage: {
    type: Schema.Types.ObjectId,
    ref: 'image',
    default: null,
  },
  PosterImage: {
    type: Schema.Types.ObjectId,
    ref: 'image',
    require: [true, 'anh dau ???'],
  },
  Images: [
    {
      type: Schema.Types.ObjectId,
      ref: 'image',
      default: null,
    },
  ],
  ReviewImage: {
    type: Schema.Types.ObjectId,
    ref: 'image',
  },
  Score: [
    {
      IMDB: {
        type: String,
      },
      RottenTomato: {
        type: String,
      },
    },
  ],
  TrailerUrl: {
    type: String,
    require,
  },
  National: {
    type: String,
  },
  isHotFilm: {
    type: Boolean,
    default: false,
  },
  isNewFilm: {
    type: Boolean,
    default: false,
  },
  isShowing: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('film', FilmSchema);
