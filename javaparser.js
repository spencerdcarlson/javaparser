"use strict";
(function() {
  var root = this
  var previous_javaparser = root.JavaParser

  var has_require = typeof require !== 'undefined'
  var _ = root._

  if(typeof _ === 'undefined') {
    if(has_require) {
      _ = require('fs');
      _ = require('readline');
    }
    else throw new Error('JavaParser requires the [fs, readline] modules');
  }
    var JavaParser = function(){};
  
    const fs = require('fs');
    const readline = require('readline');

    JavaParser.parse = function parse(file, cb) {
      const rl = readline.createInterface({
        input: fs.createReadStream(file),
        output: process.stdout
      });

      var singleLineComments = [];
      var multiLineComments = [];
      var multiLineComment = '';
      var isMultiLineComment = false;
      var isSingleLineComment = false;
      var code = '';
      var obj = {};

      rl.on('line', function(line) {  
        if(line.indexOf('//') > -1){
          isSingleLineComment = true;
          singleLineComments.push(line + '\n');
        }

        if(isMultiLineComment){
          multiLineComment += line + '\n';
        }
        if(line.indexOf('/**') > -1){
          multiLineComment += line + '\n';
          isMultiLineComment = true;
        }
        

        if(!isSingleLineComment && !isMultiLineComment){
          code += line + '\n';
        }

        if(line.indexOf('**/') > -1){
          isMultiLineComment = false;
          multiLineComments.push(multiLineComment);
        }

        isSingleLineComment = false;

      });


      rl.on('close', function() {
        var data = {
          inline:  singleLineComments,
          multiline: multiLineComments,
          code: code
        };
        cb(null, data);
      });
    }


    JavaParser.noConflict = function() {
      root.JavaParser = previous_javaparser
      return JavaParser
    }

    // prepare 
    if( typeof exports !== 'undefined' ) {
      // Node module
      if( typeof module !== 'undefined' && module.exports ) {
        exports = module.exports = JavaParser
      }
      exports.JavaParser = JavaParser
    }
    else {
      // Bowser module
      root.JavaParser = JavaParser
    }

}).call(this);
















