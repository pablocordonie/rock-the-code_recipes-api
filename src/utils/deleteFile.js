const cloudinary = require('cloudinary').v2;

const deleteFile = (url) => {

    const splitUrl = url.split('/');

    const folderName = splitUrl.at(-2);
    const fileName = splitUrl.at(-1).split('.')[0];

    cloudinary.uploader.destroy(`${folderName}/${fileName}`, () => {
        console.log('Imagen eliminada');
    });
};

module.exports = { deleteFile };