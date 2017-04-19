'use strict';
const http = require('http');
const port = 8888;

const Product = {
    name: 'Vasaló',
    price: '12000',
    qty: 4
};
let keys = Object.keys(Product);
for (let i = 0; i < keys.length; i++) {
    console.log( Product[keys[i]] );
}

// Person class.
class Person {
    constructor(name = 'Pisti') {
        this.name = name;
    }

    greet() {
        return 'Hello, my name is ' + this.name;
    }
};

const Team = {
    __proto__: new Array,
    name: 'Best',
    address: 'room 112'
};
console.log(Team.name);
Team.push( new Person('Marika') );
Team.push( new Person('Béla') );

for (let k in Team) {
    console.log(Team[k]);
}

const arr = ['vlami', true, {name: 'Pisti'}, 33];



console.log(Team[1].greet());



const handler = (req, res) => {
    res.end( JSON.stringify(Team) );
};
const server = http.createServer( handler );

server.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        let method = 'greet';
        console.log(`Server run in ${Team[1][method]()}
        and feel good`);
    }
});