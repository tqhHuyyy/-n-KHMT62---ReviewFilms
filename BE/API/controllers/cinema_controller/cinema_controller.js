var mongoose = require('mongoose'),
  Cinema = mongoose.model('cinema');

exports.get_cinema = (req, res) => {
  let page, limit;
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  const skip = page * limit - limit;
  const getCinemaPromise = new Promise((resolve, reject) => {
    Cinema.find({ isDeleted: false }, { __v: 0 })
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .then((cinemas) => {
        resolve(cinemas);
      })
      .catch((error) => {
        reject(error);
      });
  });
  const totalPage = new Promise((resolve, reject) => {
    Cinema.countDocuments({ isDeleted: false })
      .then((totalRecord) => {
        resolve(totalRecord);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getCinemaPromise
    .then((cinemas) => {
      totalPage.then((totalRecord) => {
        res.send({
          totalPage: Math.ceil(totalRecord / limit),
          cinemas,
        });
      });
    })
    .catch((error) => {
      res.send({ error });
    });
};
exports.add_cinema = (req, res) => {
  const newCinema = new Cinema(req.body);
  const addPromise = new Promise((resolve, reject) => {
    newCinema
      .save()
      .then((cinema) => {
        resolve(cinema);
      })
      .catch((error) => {
        reject(error);
      });
  });

  addPromise
    .then((cinema) => {
      res.json(cinema);
    })
    .catch((error) => {
      res.send({ error });
    });
};
exports.update_cinema = (req, res) => {
  const id = req.params.cinema_id;
  const updateCinema = req.body;
  const updatePromise = new Promise((resolve, reject) => {
    Cinema.findByIdAndUpdate(id, updateCinema, {
      new: true,
      useFindAndModify: false,
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });

  updatePromise
    .then((result) => {
      res.send({ result });
    })
    .catch((error) => {
      res.send({ error });
    });
};
exports.delete_cinema = (req, res) => {
  const listCinema = req.body;
  const deletePromise = listCinema.map(
    (cinemaId) =>
      new Promise((resolve, reject) => {
        Cinema.findByIdAndUpdate(
          cinemaId,
          { isDeleted: true },
          { new: true, useFindAndModify: false },
        )
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      }),
  );
  Promise.all(deletePromise)
    .then((result) => {
      res.send({ result });
    })
    .catch((error) => {
      res.send({ error });
    });
};

exports.search_cinema = (req, res) => {
  const textSearch = req.query.q;
  let page, limit;
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  const skip = page * limit - limit;
  const searchCinemaPromise = new Promise((resolve, reject) => {
    Cinema.find(
      { isDeleted: false, CinemaName: { $regex: textSearch } },
      { __v: 0 },
    )
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .then((cinemas) => {
        resolve(cinemas);
      })
      .catch((error) => {
        reject(error);
      });
  });
  const totalPage = new Promise((resolve, reject) => {
    Cinema.countDocuments({
      isDeleted: false,
      CinemaName: { $regex: textSearch },
    })
      .then((totalRecord) => {
        resolve(totalRecord);
      })
      .catch((error) => {
        reject(error);
      });
  });

  searchCinemaPromise
    .then((cinemas) => {
      totalPage.then((totalRecord) => {
        res.send({
          totalPage: Math.ceil(totalRecord / limit),
          cinemas,
        });
      });
    })
    .catch((error) => {
      res.send({ error });
    });
};
