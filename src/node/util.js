function Util(){};

Util.syncLoop = (iterations, process, exit) => {  
    var index = 0;
    var done = false;
    var shouldExit = false;
    var loop = {
        next: () => {
            if(done){
                if(shouldExit && exit){
                    return exit(); 
                }
            }
            if(index < iterations){
                index++;
                process(loop);
            } else {
                done = true;
                if(exit) exit();
            }
        },
        iteration: () => {
            return index - 1; 
        },
        break: (end) => {
            done = true; 
            shouldExit = end; 
        }
    };
    loop.next();
    return loop;
}

exports = module.exports = Util;