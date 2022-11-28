var mongoose = require('mongoose'),
  Actor = mongoose.model('actor'),
  Upload = require('../../models/UploadImgModel'),
  fs = require('fs');

exports.get_actor = (req, res) => {
  let page, limit;
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  const skip = page * limit - limit;
  const getActorPromise = new Promise((resolve, reject) => {
    Actor.find({ isDeleted: false }, { __v: 0 })
      .populate([
        {
          model: 'image',
          path: 'Image',
        },
      ])
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .then((actors) => {
        resolve(actors);
      })
      .catch((error) => {
        reject(error);
      });
  });
  const totalPage = new Promise((resolve, reject) => {
    Actor.countDocuments({ isDeleted: false })
      .then((totalRecord) => {
        resolve(totalRecord);
      })
      .catch((error) => {
        reject(error);
      });
  });

  getActorPromise
    .then((actors) => {
      totalPage.then((totalRecord) => {
        res.send({
          totalPage: Math.ceil(totalRecord / limit),
          actors,
        });
      });
    })
    .catch((error) => {
      res.send({ error });
    });
};
exports.add_actor = (req, res) => {
  req.files.map(async (file) => {
    if (file.fieldname === 'actorData') {
      const newActor = JSON.parse(fs.readFileSync(file.path));
      fs.unlinkSync(file.path);
      const actor = await Actor.create(newActor);
      res.redirect(307, `/actors/image/${actor._id}`);
    }
  });
};
exports.update_actor = (req, res) => {
  const id = req.params.actor_id;
  let updateActor;
  req.files.map(async (file) => {
    if (file.fieldname === 'actorData') {
      updateActor = JSON.parse(fs.readFileSync(file.path));
      fs.unlinkSync(file.path);
    }
  });
  delete updateActor.Image;
  Actor.findByIdAndUpdate(id, updateActor, {
    new: true,
    useFindAndModify: false,
  })
    .then((result) => {
      res.redirect(307, `/actors/image/${id}`);
    })
    .catch((error) => {
      res.send({ error });
    });
};
exports.delete_actor = (req, res) => {
  const listActor = req.body.listID;
  console.log(listActor, "sdf");
  const updatePromise = listActor.map(
    (actorId) =>
      new Promise((resolve, reject) => {
        Actor.findByIdAndUpdate(
          actorId,
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

  Promise.all(updatePromise)
    .then((result) => {
      res.send({ result });
    })
    .catch((error) => {
      res.send({ error });
    });
};

exports.upload_image_actor = (req, res) => {
  const id = req.params.actor_id;
  req.files.map(async (file, index) => {
    if (file.fieldname === 'actor_image') {
      Upload.uploadSingleFile({
        file,
        path: 'Movie_Introduce/ActorImage',
      })
        .then((result) => {
          const update_actor = new Promise((resolve, reject) => {
            Actor.findByIdAndUpdate(
              id,
              { Image: result._id },
              { new: true, useFindAndModify: false },
            )
              .then((actorImg) => {})
              .catch((error) => {
                reject(error);
              });
          });
        })
        .catch((error) => {
          console.log(error);
          res.send({ error });
        });
    } else {
      Actor.findByIdAndUpdate(
        id,
        { Image: '' },
        { new: true, useFindAndModify: false },
      )
        .then(() => {})
        .catch((error) => {
          // res.send({ error })
        });
    }
    if (req.files.length - 1 === index) {
      res.status(200).send({ content: 'Success' });
    }
  });
};

exports.search_actor = (req, res) => {
  const textSearch = req.query.q;
  let page, limit;
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  const skip = page * limit - limit;
  const searchActorPromise = new Promise((resolve, reject) => {
    Actor.find(
      { isDeleted: false, ActorName: { $regex: textSearch } },
      { __v: 0 },
    )
      .populate([
        {
          model: 'image',
          path: 'Image',
        },
      ])
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .then((actors) => {
        resolve(actors);
      })
      .catch((error) => {
        reject(error);
      });
  });
  const totalPage = new Promise((resolve, reject) => {
    Actor.countDocuments({
      isDeleted: false,
      ActorName: { $regex: textSearch },
    })
      .then((totalRecord) => {
        resolve(totalRecord);
      })
      .catch((error) => {
        reject(error);
      });
  });

  searchActorPromise
    .then((actors) => {
      totalPage.then((totalRecord) => {
        res.send({
          totalPage: Math.ceil(totalRecord / limit),
          actors,
        });
      });
    })
    .catch((error) => {
      res.send({ error });
    });
};
