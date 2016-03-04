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
  const parser = require('./parser');
  const util = require('./util');
  

  /**
  * @constructor
  **/
  var JavaParser = function(){

  };





  JavaParser.parseSync = (file, options) => {
    return new Promise(function (fulfill, reject){
      JavaParser.parse(file, options, (err, res)=>{
        if (err) reject(err);
        else {
          parser.parse(res.ifqa, (e,r) => {
            res.annotations = r;
            fulfill(res);
          }, options);
        } 
      });
    });
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
      output: (options.stdout === undefined) ? process.stdout : options.stdout
    });

    var result = {
      inline: [],
      multiline: [],
      ifqa: [],
      code: []
    };
      
    var multiLineComment = '';
    var isMultiLineComment = false;
    var isSingleLineComment = false;
    var isIFQA = false;
    var isChomped = false;

    rl.on('line', (line) => {  
      if(/EOS/.test(line)){
        rl.close();
      }

      if(/@IFQA/.test(line)){
        isIFQA = true;
      }
    
      if(!isIFQA){
        result.code.push(line + '\n');
      }

      // Check for single line comment '//'
      if(/\/\//.test(line)){
        isSingleLineComment = true;
        result.inline.push(line + '\n');
        if(isIFQA){
          result.ifqa.push(line + '\n');
          isIFQA = false;
        }
      }

      if(isMultiLineComment){
        multiLineComment += line + '\n';
      }

      // Check for start of a multiline comment '/*'
      if(/\/\*/.test(line)){
        isChomped = false;
        multiLineComment += line + '\n';
        isMultiLineComment = true;
      }
      
      // Check for end of multiline comment '*/'
      if(/\*\//.test(line)){
        isMultiLineComment = false;
        result.multiline.push(multiLineComment);
        if(isIFQA){
          result.ifqa.push(multiLineComment);
          isIFQA = false;
        }
        multiLineComment = '';
      }

      if(isMultiLineComment && isIFQA){
        if(!isChomped) {
          result.code.pop();
          isChomped = true;
        }
      }

      isSingleLineComment = false;

    });

    rl.on('close', () => {
      result.code = result.code.join('');
      cb(null, result);
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