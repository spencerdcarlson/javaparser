'use strict';
require('jasmine-expect');

if( typeof JavaParser === 'undefined' ) {
  var JavaParser = require('../src/node/javaparser');
}

describe('JavaParser', function(){

  it('something must be done', function(){
    expect(JavaParser).toBeDefined();
    expect(JavaParser).toBe(JavaParser);
  });

  it('parse a java file', (done) => {
	const cwd = process.argv[1].substr(0, process.argv[1].indexOf('node_modules'))
	const path = cwd + 'test/Announce.java';
	JavaParser.parse(path, (err, data) => {
		expect(data.inline).toBeNonEmptyArray();
		expect(data.multiline).toBeNonEmptyArray();
		expect(data.code).toBeTruthy();
		done();
	});
  });

 //  it('parse a java stream', (done) => {
 //  	const stream = "// $ javac Announce.java && java Announce\n class Announce {} \/**\n* 1.7\n* Chapter 1\n* Question 7\n* What is the result? (Choose all that apply.)\n* A. Compilation succeeds\n* B. Compilation fails with an error on line 6\n* C. Compilation fails with an error on line 7\n**\/\n\n\/**\n* Answer: C D\n* Variable names cannot begin with a #, and an \n* array declaration can't include a size without \n* an instantiation. The rest of the code is valid.\n**\/\n\n";
 //  	JavaParser.parse(stream, (err, data) => {
	// 	expect(data.inline).toBeNonEmptyArray();
	// 	expect(data.multiline).toBeNonEmptyArray();
	// 	expect(data.code).toBeTruthy();
	// 	done();
	// });
 //  });

});