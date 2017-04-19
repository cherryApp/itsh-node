const http = require('http');
const fs = require('fs');
const path = require('path');
const FileHandler = require('./modules/fileHandler');
const Writer = require('./modules/writer');
Writer.write();
const port = 9999;

const server = http.createServer( (req, res) => {
    if (req.method.toLowerCase() == 'get') {
        let filePath = path.join(__dirname, 'view/index.html');
        if (req.url != '/') {
            filePath = path.join(__dirname, req.url);
        }
        
        FileHandler.read(filePath).then( (body) => {
                res.end(body.data, body.encoding); 
            }, (err) => {
                console.error(err);
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