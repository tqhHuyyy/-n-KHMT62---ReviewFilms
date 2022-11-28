const Cloudinary = require('./CloudinaryModel'),
  mongoose = require('mongoose'),
  Image = mongoose.model('image');

module.exports = {
  uploadMultipleFile: (request) => {
    return new Promise((resolve, reject) => {
      console.log(request);
      let resPromise = request.file.map(
        (file) =>
          new Promise((resolve, reject) => {
            Cloudinary.uploadMultiple({
              file: file.path,
              path: request.path,
            })
              .then((result) => {
                Image.create({
                  ImageName: result.name,
                  Url: result.url,
                  ImageId: result.id,
                })
                  .then((image) => {
                    resolve(image);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              })
              .catch((error) => {
                reject(error);
              });
          }),
      );
      Promise.all(resPromise)
        .then((arrImg) => {
          resolve(arrImg);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  uploadSingleFile: (request) => {
    return new Promise((resolve, reject) => {
      Cloudinary.uploadSingle({
        file: request.file.path,
        path: request.path,
      })
        .then((result) => {
          Image.create({
            ImageName: result.name,
            Url: result.url,
            ImageId: result.id,
          })
            .then((image) => {
              resolve(image);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
