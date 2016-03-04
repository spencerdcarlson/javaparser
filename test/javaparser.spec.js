var jasmine = require('jasmine-expect');
var fs = require('fs');

if( typeof JavaParser === 'undefined' ) {
  var JavaParser = require('../src/node/javaparser');
}

describe('JavaParser', function(){

  it('something must be done', function(){
    expect(JavaParser).toBeDefined();
    expect(JavaParser).toBe(JavaParser);
  });

  it('parse a java file', (done) => {
	const cwd = process.argv[1].substr(0, process.argv[1].indexOf('node_modules'));
	const path = cwd + 'test/Shuttle.java';
	// Read from file
	options = { isStream: false, stdout: '/dev/null' };
	JavaParser.parseSync(path, options).then((res) => {
		expect(res).toBeDefined();
		// console.log(res.annotations.get('@Option'));
		done();
	});
  });

  it('parse a java file stream', (done) => {
	// Read from stream
	const cwd = process.argv[1].substr(0, process.argv[1].indexOf('node_modules'));
	const path = cwd + 'test/Shuttle.java';
	var options = {isStream: true, stdout: '/dev/null'};
	fs.readFile(path, 'utf8', function (err,data) {
	  if (err) return console.log(err);
	  JavaParser.parseSync(data, options).then((res) => {
			expect(res).toBeDefined();
			done();
		});
	});
  });



});