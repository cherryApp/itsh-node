const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 9999;

class FileHandler {
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
}

const server = http.createServer( (req, res) => {
    if (req.method.toLowerCase() == 'get') {
        let filePath = path.join(__dirname, 'view/index.html');
        if (req.url != '/') {
            filePath = path.join(__dirname, req.url);
        }
        let r1 = FileHandler.read(filePath);
        let r2 = FileHandler.read(filePath);
        let r3 = FileHandler.read(filePath);
        let r4 = FileHandler.read(filePath);
        let r5 = FileHandler.read(filePath);
        Promise.all([r1, r2, r3, r4, r5]).then( (args) => {
                let content = '';
                for (let k in args) {
                    content += args[k].data;
                }
                res.end(content); 
            }, (err) => {
                res.end('file error');
            });
    }
});

server.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log(`Server run in ${port}`);
});