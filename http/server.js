'use strict';
const http = require('http');
const port = 8888;

const handler = (req, res) => {
    if (req.method.toLowerCase() == 'get') {
        let json = JSON.stringify( req.headers, null, 4 );
        let content = `<pre>${json}</pre>`;
        res.end( content );
    } else {
        res.end(`Invalid method: ${req.method}`);
    }


};
const server = http.createServer( handler );

server.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        let method = 'greet';
        console.log(`Server run in ${port}`);
    }
});