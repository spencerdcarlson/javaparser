var Parsed =  require('./parsed');
var Annotations = require('./annotation');
var RMStream = require('./rmstream');
var readline = require('readline');

function Parser(){};

Parser.parse = (ifqa, cb, options) => {
    var parsed = new Parsed();
    var stream =  new RMStream(ifqa.join(''));

    const rl = readline.createInterface({
      input: stream,
      output: (options.stdout === undefined) ? process.stdout : options.stdout
    });
    
    var annotations = new Annotations();

    var lastCmd = '';
    var value = '';

    rl.on('line', (line) => {
      if(/EOS/.test(line)){
        rl.close();
      }
      // only match lines that start with a zero or more spaces or an '*'
      // and doesn't end with a '/'
      if(/^\s?\*/.test(line) && !/\/$/.test(line)){

        if(/\*\s*@/.test(line)){
        // line that contains a parameter
          if(/@.*@/.test(line)){
            // Multipe parameters per line. '// @IFQA @comment this'
            //TODO error?
          }
          var info = /@[a-zA-Z]+\s*/.exec(line);
          if(info){
            var cmd = info[0].replace(/\s+/g, '');
            if(annotations.test(cmd)){
              lastCmd = cmd;
              value = line.replace(cmd, '').replace('*', '').replace(/^\s+/, '');
              parsed.add(lastCmd, value);
            }
          }
        }
        else {
          // Line doesn't contain a @Parameter and must be multiline
          parsed.remove(lastCmd, value);
          value += line.replace('*', '');
          parsed.add(lastCmd, value);
        }
      }
    });

    rl.on('close', () => {
      cb(null, parsed);
     // console.log('@Chapter' + JSON.stringify(parsed.get('@Chapter')));
     // console.log('@Question' + JSON.stringify(parsed.get('@Question')));
     // console.log('@Command' + JSON.stringify(parsed.get('@Command')));
     // console.log('@QText' + JSON.stringify(parsed.get('@QText')));
     // console.log('@Optoin' + JSON.stringify(parsed.get('@Optoin')));
     // console.log('@Answer' + JSON.stringify(parsed.get('@Answer')));
     // console.log('@Exp' + JSON.stringify(parsed.get('@Exp')));
     // // console.log('@IFQA' + JSON.stringify(parsed.get('@IFQA')));
    });

  };

exports = module.exports = Parser