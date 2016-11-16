console.log(process.argv);

var fs = require('fs');

/**
 * 二进制 Buffer 例子
 */
var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
var dup = new Buffer(bin.length);

bin.copy(dup);

dup[0] = 0x48;

console.log(bin.toString('utf-8'));
console.log(dup.toString('utf-8'));

var bin = fs.readFileSync('./main.js');
if (bin[0] == 0xef && bin[1] === 0xbb && bin[2] === 0xbf) {
    console.log('xxxxxxxxxxxxxxxxxxxxx');
}
// console.log(bin.toString('utf-8'));
