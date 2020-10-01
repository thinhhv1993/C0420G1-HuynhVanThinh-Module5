"use strict";
exports.__esModule = true;
require("./scss/styles.scss");
/**
 * If/else
 */
var count = 50;
if (count > 0) {
    count--;
}
else {
    count = 0;
}
console.log(count);
/**
 * loop
 */
console.log("for loop");
var keys = "abcdef";
for (var idx_1 = 0; idx_1 < keys.length; ++idx_1) {
    console.log(keys[idx_1]);
}
console.log("while loop");
var idx = 0;
while (idx < keys.length) {
    console.log(keys[idx]);
    ++idx;
}
console.log("do-while loop");
idx = 0;
do {
    console.log(keys[idx]);
    ++idx;
} while (idx < keys.length);
console.log("for-of loop");
for (var i = 0; i < keys.length; i++) {
    console.log(keys[i]);
}
console.log("for-in loop");
var user = {
    name: 'Bob',
    age: 55
};
for (var key in user) {
    console.log(key + ": " + user[key]);
}
