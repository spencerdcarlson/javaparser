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
      _ = require('./rmstream');
    }
    else throw new Error('JavaParser requires the [fs, readline] modules');
  }

  const fs = require('fs');
  const readline = require('readline');
  const stream = require('stream');
  const rmstream = require('./rmstream');
  

  /**
  * @constructor
  **/
  var JavaParser = function(){


  };

function completer(line) {
  var completions = '.help .error .exit .quit .q'.split(' ')
  var hits = completions.filter((c) => { return c.indexOf(line) == 0 })
  // show all completions if none found
  return [hits.length ? hits : completions, line]
}
  

  /**
  * Parses a .java file
  * @param {string} file - Full path to a java file.
  * @param {function} cb - Callback method. (err, data) => { }.
  **/
  JavaParser.parse = function parse(file, options, cb) {
    var isStream = false;
    
    if(typeof options !== 'undefined'){
      isStream = options.isStream;
    }

    
    if(isStream){
      var stream =  new rmstream(file);
    }
    else {
      var stream = fs.createReadStream(file);
    }

    const rl = readline.createInterface({
      input: stream,
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
      // Check for manual EOF
      if(line.indexOf('^EOS') > -1){
        rl.close();
      }

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

  /**
  * noConflict method to mimic JQuery
  **/
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
















