var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'thcx',
  api_key: '645636754657628',
  api_secret: '2mORC2ypJEjMy7ctzGNXF91CYvk',
});

module.exports = {
  uploadSingle: (request) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload(request.file, {
          folder: request.path,
        })
        .then((result) => {
          const filename = String(request.file).split('\\');
          const fs = require('fs');
          fs.unlinkSync(request.file);
          resolve({
            name: filename[filename.length - 1],
            url: result.secure_url,
            id: result.public_id,
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  uploadMultiple: (request) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload(request.file, {
          folder: request.path,
        })
        .then((result) => {
          const filename = String(request.file).split('\\');
          console.log(filename[filename.length - 1]);
          const fs = require('fs');
          fs.unlinkSync(request.file);
          resolve({
            name: filename[filename.length - 1],
            url: result.secure_url,
            id: result.public_id,
            // thumb: self.reSizeImage(result.public_id, 200, 200),
            // main: self.reSizeImage(result.public_id, 500, 500),
            // thumb2: self.reSizeImage(result.public_id, 300, 300)
          }).catch((error) => {
            reject(error);
          });
        });
    });
  },
  reSizeImage: (id, h, w) => {
    return cloudinary.url(id, {
      height: h,
      width: w,
      crop: 'scale',
      format: 'jpg',
    });
  },
};
