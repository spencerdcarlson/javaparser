"use strict";
const stream = require('stream');
const util = require('util');
const Readable = stream.Readable;


/** Readable memory stream 
*
**/
function RMStream(string, options) {
  // allow use without new operator
  if (!(this instanceof RMStream)) {
    return new RMStream(key, string, options);
  }
  Readable.call(this, options);
  this.push(string);
  this.push('EOS\n');
}
util.inherits(RMStream, Readable);

RMStream.prototype._read = (size) => {};

exports = module.exports = RMStream;