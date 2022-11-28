var mongoose = require('mongoose'),
  Cinema = mongoose.model('cinema'),
  Upload = require('../../models/UploadImgModel'),
  CinemaCluster = require('../../models/CinemaClusterModel'),
  fs = require('fs');

exports.get_cinema_cluster = (req, res) => {
  let page, limit;
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  const skip = page * limit - limit;
  const getCinemaPromise = new Promise((resolve, reject) => {
    CinemaCluster.find({ isDeleted: false }, { __v: 0 })
      .populate([
        {
          model: 'cinema',
          path: 'Cinemas',
          patch: { isDeleted: false },
        },
        {
          model: 'image',
          path: 'CinemaImage',
          patch: { isDeleted: false },
        },
        {
          model: 'image',
          path: 'FareImage',
          patch: { isDeleted: false },
        },
      ])
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
    CinemaCluster.countDocuments({ isDeleted: false })
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

exports.get_single_cinema_cluster = (req, res) => {
  const getSingleCinemaPromise = new Promise((resolve, reject) => {
    CinemaCluster.findById(req.params.cinema_id, { isDeleted: false })
      .populate([
        {
          path: 'Cinemas',
          model: 'cinema',
          patch: { isDeleted: false },
        },
        {
          path: 'ContentImage',
          model: 'image',
        },
        {
          path: 'CinemaImage',
          model: 'image',
        },
        {
          path: 'FareImage',
          model: 'image',
        },
      ])
      .then((cinemas) => {
        resolve(cinemas);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getSingleCinemaPromise
    .then((cinemas) => {
      res.send(cinemas);
    })
    .catch((error) => {
      res.send({ error });
    });
};

exports.add_cinema_cluster = async (req, res) => {
  let newCinema;
  let oldCinema;
  req.files.map((file) => {
    if (file.fieldname === 'cinemaClusterData') {
      newCinema = JSON.parse(fs.readFileSync(file.path));
      fs.unlinkSync(file.path);
    }
  });
  if (newCinema.Cinemas.length > 0) {
    const resPromise = await newCinema.Cinemas.map(
      (cinema) =>
        new Promise((resolve, reject) => {
          if (cinema._id === undefined) {
            Cinema.create(cinema).then(async (result) => {
              newCinema.Cinemas.push(result);
              oldCinema = newCinema.Cinemas.filter(
                (cinema) => cinema._id !== undefined,
              );
              newCinema.Cinemas = oldCinema;
              resolve(oldCinema);
            });
          }
        }),
    );
    Promise.all(resPromise).then(async (result) => {
      console.log(result);
      newCinema.Cinemas = result[result.length - 1];
      console.log(newCinema);
      const cinema = await CinemaCluster.create(newCinema);
      res.redirect(307, `/cinemas_cluster/cinema_image/${cinema._id}`);
    });
  } else {
    const cinema = await CinemaCluster.create(newCinema);
    res.redirect(307, `/cinemas_cluster/cinema_image/${cinema._id}`);
  }
};

exports.update_cinema_cluster = (req, res) => {
  const id = req.params.cinema_id;
  let updateCinema;
  req.files.map(async (file) => {
    if (file.fieldname === 'cinemaClusterData') {
      updateCinema = JSON.parse(fs.readFileSync(file.path));
      fs.unlinkSync(file.path);
    }
  });
  if (updateCinema.Cinemas) {
    updateCinema.Cinemas.map((cinema) => {
      if (cinema._id === undefined) {
        Cinema.create(cinema).then((result) => {
          updateCinema.Cinemas.push(result);
          const oldCinema = updateCinema.Cinemas.filter(
            (cinema) => cinema._id !== undefined,
          );
          updateCinema.Cinemas = oldCinema;
          CinemaCluster.findByIdAndUpdate(id, updateCinema, {
            new: true,
            useFindAndModify: false,
          })
            .then((cinema) => {
              res.redirect(307, `/cinemas_cluster/cinema_image/${cinema._id}`);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        CinemaCluster.findByIdAndUpdate(id, updateCinema, {
          new: true,
          useFindAndModify: false,
        })
          .then((cinema) => {
            res.redirect(307, `/cinemas_cluster/cinema_image/${cinema._id}`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
};
exports.delete_cinema_cluster = (req, res) => {
  const listCinemaCluster = req.body.listID;
  const deletePromise = listCinemaCluster.map(
    (cinemaClusterId) =>
      new Promise((resolve, reject) => {
        CinemaCluster.findByIdAndUpdate(
          cinemaClusterId,
          { isDeleted: true },
          { useFindAndModify: false, new: true },
        )
          .then((genre) => {
            resolve(genre);
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

exports.upload_cinema_image = (req, res) => {
  const id = req.params.cinema_id;
  req.files.map((file, index) => {
    if (file.fieldname === 'cinema_image') {
      Upload.uploadSingleFile({
        file,
        path: 'Movie_Introduce/CinemaImage/CinemaImage',
      })
        .then((result) => {
          const update_cinema = new Promise((resolve, reject) => {
            CinemaCluster.findByIdAndUpdate(
              id,
              { CinemaImage: result._id },
              { new: true, useFindAndModify: false },
            )
              .then((cinemaImg) => {
                resolve(cinemaImg);
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (file.fieldname === 'fare_image') {
      Upload.uploadSingleFile({
        file: file,
        path: 'Movie_Introduce/CinemaImage/FareImage',
      })
        .then((result) => {
          const update_cinema = new Promise((resolve, reject) => {
            CinemaCluster.findByIdAndUpdate(
              id,
              { FareImage: result._id },
              { new: true, useFindAndModify: false },
            )
              .then((cinemaImg) => {
                resolve(cinemaImg);
              })
              .catch((error) => {
                reject(error);
              });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (req.files.length - 1 === index) {
      res.status(200).send({ content: 'Success' });
    }
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
    CinemaCluster.find(
      {
        isDeleted: false,
        CinemaClusterName: { $regex: textSearch, options: 'i' },
      },
      { __v: 0 },
    )
      .populate([
        {
          path: 'image',
          model: 'Image',
        },
      ])
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
    CinemaCluster.countDocuments({
      isDeleted: false,
      CinemaClusterName: { $regex: textSearch, options: 'i' },
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
