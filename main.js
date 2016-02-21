var JavaParser = require('./src/node/javaparser');
const stream = "// $ javac Announce.java && java Announce\n class Announce {} \n\/**\n* 1.7\n* Chapter 1\n* Question 7\n* What is the result? (Choose all that apply.)\n* A. Compilation succeeds\n* B. Compilation fails with an error on line 6\n* C. Compilation fails with an error on line 7\n**\/\n\n\/**\n* Answer: C D\n* Variable names cannot begin with a #, and an \n* array declaration can't include a size without \n* an instantiation. The rest of the code is valid.\n**\/\n\n";
JavaParser.parse(stream, {isStream: true}, (err, data) => {
	console.log('data.inline: ' + data.inline);
	console.log('data.multiline: ' + data.multiline);
	console.log('data.code: ' + data.code);
});

// const path = '/Users/sc/projects/oca_java_7/ch1/Announce.java';
// JavaParser.parse(path, {isStream: false}, (err, data) => {
// 	console.log('data.inline: ' + data.inline);
// 	console.log('data.multiline: ' + data.multiline);
// 	console.log('data.code: ' + data.code);
// });
