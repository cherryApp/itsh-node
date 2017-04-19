const fs = require('fs');

module.exports = class FileHandler {
    static read(filePath) {
        return new Promise( (resolve, reject) => {
            let binaries = ['jpg', 'jpeg', 'png', 'doc', 'bmp', 'gif'];
            let ext = filePath.split('.').pop().toLowerCase();
            let encoding = binaries.indexOf(ext) > -1 ? 'binary' : 'utf8';
            fs.readFile(filePath, encoding, (err, data) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                resolve({
                    data: data,
                    encoding: encoding
                });
            });
        });
    }
};