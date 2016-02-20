'use strict';
require('jasmine-expect');

if( typeof JavaParser === 'undefined' ) {
  var JavaParser = require('../javaparser');
}

describe('JavaParser', function(){

  it('something must be done', function(){
    // expect(JavaParser).toHaveMethod('parse');
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

});