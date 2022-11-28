const mongoose = require('mongoose'),
  Film = mongoose.model('film'),
  Upload = require('../../models/UploadImgModel'),
  fs = require('fs');

exports.get_film = (req, res) => {
  let page = 1,
    limit = 5;
  if (req.query._page) {
    page = parseInt(req.query._page);
  }
  if (req.query._limit) {
    limit = parseInt(req.query._limit);
  }
  const skip = page * limit - limit;
  const totalPage = new Promise((resolve, reject) => {
    Film.countDocuments({ isDeleted: false })
      .then((record) => resolve(record))
      .catch((error) => reject(error));
  })
    .then((totalRecord) => {
      return Math.ceil(totalRecord / limit);
    })
    .catch((error) => {
      res.send({ error });
    });

  const getPromise = new Promise((resolve, reject) => {
    Film.find({ isDeleted: false }, { __v: 0 })
      .populate([
        {
          path: 'Actors',
          model: 'actor',
          match: { isDeleted: false },
          populate: {
            path: 'Image',
          },
        },
        {
          path: 'Cinemas',
          model: 'cinemaCluster',
          match: { isDeleted: false },
        },
        {
          path: 'CoverImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'PosterImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'Images',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'ReviewImage',
          model: 'image',
          match: { isDeleted: false },
        },
      ])
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip)
      .then((films) => {
        resolve(films);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getPromise.then((films) => {
    totalPage.then((totalRecord) => {
      res.send({
        totalPage: totalRecord,
        Films: films,
      });
    });
  });
};

exports.get_film_by_id = (req, res) => {
  console.log(req.params.film_id);
  const getOnePromise = new Promise((resolve, reject) => {
    Film.findById(req.params.film_id)
      .populate([
        {
          path: 'Actors',
          model: 'actor',
          match: { isDeleted: false },
          populate: {
            path: 'Image',
          },
        },
        {
          path: 'Cinemas',
          model: 'cinemaCluster',
          match: { isDeleted: false },
        },
        {
          path: 'CoverImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'PosterImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'Images',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'ReviewImage',
          model: 'image',
          match: { isDeleted: false },
        },
      ])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
  getOnePromise
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send({ error });
    });
};

exports.add_film = async (req, res) => {
  req.files.map(async (file) => {
    if (file.fieldname === 'filmData') {
      const newFilm = JSON.parse(fs.readFileSync(file.path));
      fs.unlinkSync(file.path);
      console.log(1111, newFilm);
      const film = await Film.create(newFilm);
      res.redirect(307, `/films/film_image/${film._id}`);
    }
  });
};

exports.update_film = (req, res) => {
  let updateFilm;
  const id = req.params.film_id;
  req.files.map((file) => {
    if (file.fieldname === 'filmData') {
      updateFilm = JSON.parse(fs.readFileSync(file.path));
      fs.unlinkSync(file.path);
    }
  });

  Film.findByIdAndUpdate(id, updateFilm, { new: true, useFindAndModify: false })
    .then(() => {
      res.redirect(307, `/films/film_image/${id}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.delete_film = (req, res) => {
  const listId = req.body.listID;
  const deletePromise = listId.map(
    (filmId) =>
      new Promise((resolve, reject) => {
        Film.findByIdAndUpdate(filmId, { isDeleted: true }, { new: true })
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      }),
  );
  Promise.all(deletePromise)
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      res.send({ err });
    });
};

exports.upload_film_image = (req, res) => {
  const id = req.params.film_id;
  let image_id = [];
  req.files.map((file, index) => {
    switch (file.fieldname) {
      case 'cover_image':
        Upload.uploadSingleFile({
          file,
          path: 'Movie_Introduce/FilmImage/CoverImage',
        })
          .then((result) => {
            const update_film = new Promise((resolve, reject) => {
              Film.findByIdAndUpdate(
                id,
                { CoverImage: result._id },
                { new: true, useFindAndModify: false },
              )
                .then((film) => {
                  resolve(film);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 'poster_image':
        console.log(1);
        Upload.uploadSingleFile({
          file,
          path: 'Movie_Introduce/FilmImage/PosterImage',
        })
          .then((result) => {
            const id = req.params.film_id;
            const update_film = new Promise((resolve, reject) => {
              Film.findByIdAndUpdate(
                id,
                { PosterImage: result._id },
                { new: true, useFindAndModify: false },
              )
                .then((film) => {
                  resolve(film);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 'review_image':
        Upload.uploadSingleFile({
          file,
          path: 'Movie_Introduce/FilmImage/ReviewImage',
        })
          .then((result) => {
            const id = req.params.film_id;
            const update_film = new Promise((resolve, reject) => {
              Film.findByIdAndUpdate(
                id,
                { ReviewImage: result._id },
                { new: true, useFindAndModify: false },
              )
                .then((film) => {
                  resolve(film);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 'film_image':
        Upload.uploadSingleFile({
          file,
          path: 'Movie_Introduce/FilmImage/FilmImage',
        })
          .then((result) => {
            image_id.push(result._id);
            const update_film = new Promise((resolve, reject) => {
              Film.findByIdAndUpdate(
                id,
                { Images: image_id },
                { new: true, useFindAndModify: false },
              )
                .then((film) => {
                  resolve(film);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      default:
        break;
    }
    if (req.files.length - 1 === index) {
      res.status(200).send({ content: 'Success' });
    }
  });
};

exports.get_film_by_genre = (req, res) => {
  let { page = 1, limit = 5 } = req.param;
  if (req.query._page) {
    page = parseInt(req.query._page);
  }
  if (req.query._limit) {
    limit = parseInt(req.query._limit);
  }
  const genre = req.params.genre;
  const skip = page * limit - limit;
  const totalPage = new Promise((resolve, reject) => {
    Film.countDocuments({ isDeleted: false, Genres: genre })
      .then((record) => resolve(record))
      .catch((error) => reject(error));
  })
    .then((totalRecord) => {
      return Math.ceil(totalRecord / limit);
    })
    .catch((error) => {
      res.send({ error });
    });

  const getPromise = new Promise((resolve, reject) => {
    Film.find(
      { isDeleted: false, Genres: { $regex: genre, $options: 'i' } },
      { __v: 0 },
    )
      .populate([
        {
          path: 'Actors',
          model: 'actor',
          match: { isDeleted: false },
        },
        {
          path: 'Cinemas',
          model: 'cinemaCluster',
          match: { isDeleted: false },
        },
        {
          path: 'CoverImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'PosterImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'Images',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'ReviewImage',
          model: 'image',
          match: { isDeleted: false },
        },
      ])
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip)
      .then((films) => {
        resolve(films);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getPromise.then((films) => {
    totalPage.then((totalRecord) => {
      res.send({
        totalPage: totalRecord,
        Films: films,
      });
    });
  });
};

exports.get_new_film = (req, res) => {
  let page = 1,
    limit = 5;
  if (req.query._page) {
    page = parseInt(req.query._page);
  }
  if (req.query._limit) {
    limit = parseInt(req.query._limit);
  }
  let textSearch = '';
  if (req.query.q) {
    textSearch = req.query.q;
  }
  const skip = page * limit - limit;
  const totalPage = new Promise((resolve, reject) => {
    Film.countDocuments({
      isDeleted: false,
      isNewFilm: true,
      FilmName: { $regex: textSearch, $options: 'i' },
    })
      .then((record) => resolve(record))
      .catch((error) => reject(error));
  })
    .then((totalRecord) => {
      return Math.ceil(totalRecord / limit);
    })
    .catch((error) => {
      res.send({ error });
    });

  const getPromise = new Promise((resolve, reject) => {
    Film.find(
      {
        isDeleted: false,
        isNewFilm: true,
        FilmName: { $regex: textSearch, $options: 'i' },
      },
      { __v: 0 },
    )
      .populate([
        {
          path: 'Actors',
          model: 'actor',
          match: { isDeleted: false },
          populate: {
            path: 'Image',
          },
        },
        {
          path: 'Cinemas',
          model: 'cinemaCluster',
          match: { isDeleted: false },
        },
        {
          path: 'CoverImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'PosterImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'Images',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'ReviewImage',
          model: 'image',
          match: { isDeleted: false },
        },
      ])
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip)
      .then((films) => {
        resolve(films);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getPromise.then((films) => {
    totalPage.then((totalRecord) => {
      res.send({
        totalPage: totalRecord,
        Films: films,
      });
    });
  });
};

exports.get_hot_film = (req, res) => {
  let page = 1,
    limit = 5;
  if (req.query._page) {
    page = parseInt(req.query._page);
  }
  if (req.query._limit) {
    limit = parseInt(req.query._limit);
  }
  let textSearch = '';
  if (req.query.q) {
    textSearch = req.query.q;
  }
  const skip = page * limit - limit;
  const totalPage = new Promise((resolve, reject) => {
    Film.countDocuments({
      isDeleted: false,
      isHotFilm: true,
      FilmName: { $regex: textSearch, $options: 'i' },
    })
      .then((record) => resolve(record))
      .catch((error) => reject(error));
  })
    .then((totalRecord) => {
      return Math.ceil(totalRecord / limit);
    })
    .catch((error) => {
      res.send({ error });
    });

  const getPromise = new Promise((resolve, reject) => {
    Film.find(
      {
        isDeleted: false,
        isHotFilm: true,
        FilmName: { $regex: textSearch, $options: 'i' },
      },
      { __v: 0 },
    )
      .populate([
        {
          path: 'Actors',
          model: 'actor',
          match: { isDeleted: false },
          populate: {
            path: 'Image',
          },
        },
        {
          path: 'Cinemas',
          model: 'cinemaCluster',
          match: { isDeleted: false },
        },
        {
          path: 'CoverImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'PosterImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'Images',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'ReviewImage',
          model: 'image',
          match: { isDeleted: false },
        },
      ])
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip)
      .then((films) => {
        resolve(films);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getPromise.then((films) => {
    totalPage.then((totalRecord) => {
      res.send({
        totalPage: totalRecord,
        Films: films,
      });
    });
  });
};

exports.get_not_new_film = (req, res) => {
  const getPromise = new Promise((resolve, reject) => {
    Film.find(
      {
        isDeleted: false,
        isNewFilm: false,
      },
      { __v: 0 },
    )
      .populate([
        {
          path: 'CoverImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'PosterImage',
          model: 'image',
          match: { isDeleted: false },
        },
      ])
      .sort({ _id: -1 })
      .then((films) => {
        resolve(films);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getPromise.then((films) => {
    res.send(films);
  });
};

exports.get_not_hot_film = (req, res) => {
  const getPromise = new Promise((resolve, reject) => {
    Film.find({ isDeleted: false, isHotFilm: false }, { __v: 0 })
      .populate([
        {
          path: 'CoverImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'PosterImage',
          model: 'image',
          match: { isDeleted: false },
        },
      ])
      .sort({ _id: -1 })
      .then((films) => {
        resolve(films);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getPromise.then((films) => {
    res.send(films);
  });
};

exports.update_hot_film = (req, res) => {
  req.body.map((film, index) => {
    Film.findByIdAndUpdate(
      film._id,
      { isHotFilm: true },
      {
        new: true,
        useFindAndModify: false,
      },
    )
      .then((result) => { })
      .catch((err) => {
        console.log(err);
      });
    if (req.body.length - 1 === index) {
      res.status(200).send({ content: 'Success' });
    }
  });
};

exports.update_new_film = (req, res) => {
  req.body.map((film, index) => {
    Film.findByIdAndUpdate(
      film._id,
      { isNewFilm: true },
      {
        new: true,
        useFindAndModify: false,
      },
    )
      .then((result) => { })
      .catch((err) => {
        console.log(err);
      });
    if (req.body.length - 1 === index) {
      res.status(200).send({ content: 'Success' });
    }
  });
};

exports.get_in_theater_film = (req, res) => {
  let page = 1,
    limit = 5;
  if (req.query._page) {
    page = parseInt(req.query._page);
  }
  if (req.query._limit) {
    limit = parseInt(req.query._limit);
  }
  let textSearch = '';
  if (req.query.q) {
    textSearch = req.query.q;
  }
  const skip = page * limit - limit;
  const totalPage = new Promise((resolve, reject) => {
    Film.countDocuments({
      isDeleted: false,
      ReleaseDate: { $lt: Date.now() },
      isShowing: true,
      FilmName: { $regex: textSearch, $options: 'i' },
    })
      .then((record) => resolve(record))
      .catch((error) => reject(error));
  })
    .then((totalRecord) => {
      return Math.ceil(totalRecord / limit);
    })
    .catch((error) => {
      res.send({ error });
    });

  const getPromise = new Promise((resolve, reject) => {
    Film.find(
      {
        isDeleted: false,
        ReleaseDate: { $lt: Date.now() },
        isShowing: true,
        FilmName: { $regex: textSearch, $options: 'i' },
      },
      { __v: 0 },
    )
      .populate([
        {
          path: 'Actors',
          model: 'actor',
          match: { isDeleted: false },
          populate: {
            path: 'Image',
          },
        },
        {
          path: 'Cinemas',
          model: 'cinemaCluster',
          match: { isDeleted: false },
        },
        {
          path: 'CoverImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'PosterImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'Images',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'ReviewImage',
          model: 'image',
          match: { isDeleted: false },
        },
      ])
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip)
      .then((films) => {
        resolve(films);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getPromise.then((films) => {
    totalPage.then((totalRecord) => {
      res.send({
        totalPage: totalRecord,
        Films: films,
      });
    });
  });
};

exports.delete_in_theater_film = (req, res) => {
  req.body.map((_id, index) => {
    Film.findByIdAndUpdate(
      _id,
      { isShowing: false },
      { new: true, useFindAndModify: false },
    )
      .then(() => { })
      .catch((err) => {
        console.log(err);
      });
    console.log(index, req.body.length - 1);
    if (index === req.body.length - 1) {
      res.status(200).send({ content: 'Success' });
    }
  });
};
exports.delete_hot_film = (req, res) => {
  req.body.map((_id, index) => {
    Film.findByIdAndUpdate(
      _id,
      { isHotFilm: false },
      { new: true, useFindAndModify: false },
    )
      .then(() => { })
      .catch((err) => {
        console.log(err);
      });
    console.log(index, req.body.length - 1);
    if (index === req.body.length - 1) {
      res.status(200).send({ content: 'Success' });
    }
  });
};

exports.delete_new_film = (req, res) => {
  req.body.map((_id, index) => {
    Film.findByIdAndUpdate(
      _id,
      { isNewFilm: false },
      { new: true, useFindAndModify: false },
    )
      .then(() => { })
      .catch((err) => {
        console.log(err);
      });
    console.log(index, req.body.length - 1);
    if (index === req.body.length - 1) {
      res.status(200).send({ content: 'Success' });
    }
  });
};

exports.get_coming_soon_film = (req, res) => {
  let page = 1,
    limit = 5;
  if (req.query._page) {
    page = parseInt(req.query._page);
  }
  if (req.query._limit) {
    limit = parseInt(req.query._limit);
  }
  let textSearch = '';
  if (req.query.q) {
    textSearch = req.query.q;
  }
  const skip = page * limit - limit;
  const totalPage = new Promise((resolve, reject) => {
    Film.countDocuments({
      isDeleted: false,
      ReleaseDate: { $gt: Date.now() },
      FilmName: { $regex: textSearch, $options: 'i' },
    })
      .then((record) => resolve(record))
      .catch((error) => reject(error));
  })
    .then((totalRecord) => {
      return Math.ceil(totalRecord / limit);
    })
    .catch((error) => {
      res.send({ error });
    });

  const getPromise = new Promise((resolve, reject) => {
    Film.find(
      {
        isDeleted: false,
        ReleaseDate: { $gt: Date.now() },
        FilmName: { $regex: textSearch, $options: 'i' },
      },
      { __v: 0 },
    )
      .populate([
        {
          path: 'Actors',
          model: 'actor',
          match: { isDeleted: false },
          populate: {
            path: 'Image',
          },
        },
        {
          path: 'Cinemas',
          model: 'cinemaCluster',
          match: { isDeleted: false },
        },
        {
          path: 'CoverImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'PosterImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'Images',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'ReviewImage',
          model: 'image',
          match: { isDeleted: false },
        },
      ])
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip)
      .then((films) => {
        resolve(films);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getPromise.then((films) => {
    totalPage.then((totalRecord) => {
      res.send({
        totalPage: totalRecord,
        Films: films,
      });
    });
  });
};

exports.search_film = (req, res) => {
  let textSearch = '';
  if (req.query.q) {
    textSearch = req.query.q;
  }
  let page = 1,
    limit = 5;
  if (req.query._page) {
    page = parseInt(req.query._page);
  }
  if (req.query._limit) {
    limit = parseInt(req.query._limit);
  }
  const skip = page * limit - limit;
  const totalPage = new Promise((resolve, reject) => {
    Film.countDocuments({
      isDeleted: false,
      FilmName: { $regex: textSearch, $options: 'i' },
    })
      .then((record) => resolve(record))
      .catch((error) => reject(error));
  })
    .then((totalRecord) => {
      return Math.ceil(totalRecord / limit);
    })
    .catch((error) => {
      res.send({ error });
    });

  const getPromise = new Promise((resolve, reject) => {
    Film.find(
      { isDeleted: false, FilmName: { $regex: textSearch, $options: 'i' } },
      { __v: 0 },
    )
      .populate([
        {
          path: 'Actors',
          model: 'actor',
          match: { isDeleted: false },
          populate: {
            path: 'Image',
          },
        },
        {
          path: 'Cinemas',
          model: 'cinemaCluster',
          match: { isDeleted: false },
        },
        {
          path: 'CoverImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'PosterImage',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'Images',
          model: 'image',
          match: { isDeleted: false },
        },
        {
          path: 'ReviewImage',
          model: 'image',
          match: { isDeleted: false },
        },
      ])
      .sort({ _id: -1 })
      .limit(limit)
      .skip(skip)
      .then((films) => {
        resolve(films);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getPromise.then((films) => {
    totalPage.then((totalRecord) => {
      res.send({
        totalPage: totalRecord,
        Films: films,
      });
    });
  });
};
