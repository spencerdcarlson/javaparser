function Parsed() {
  this.keys = [];
  this.pairs = [];
  
  /**
  *
  **/
  this.add = (key, value) => {
    if(!includes(this.keys, key, { casecmp: true } )){
      this.keys.push(key);
    }
    this.pairs.push({key: key, value: value});
  }

  /**
  *
  **/
  this.get = (key) => {
    if(!includes(this.keys, key, { casecmp: true } )){
      throw Error('Object does not contain any paris where key=['+key+']');
    }
    var result = [];
    for(var o in this.pairs){
      if(this.pairs[o].key.toUpperCase() === key.toUpperCase()){
        result.push(this.pairs[o]);
      }
    }
    return result;
  }

  /**
  *
  **/
  this.remove = (key, value) => { 
    if(!includes(this.keys, key, { casecmp: true } )){
      throw Error('Object does not contain any paris where key=['+key+']');
    }
    var index = 0;
    for (var i = 0; i < this.pairs.length; i++) {
      if(this.pairs[i].key.toUpperCase() === key.toUpperCase()){
        if(this.pairs[i].value === value){
          index = i;
        }
      }
    }
    this.pairs.splice(index, 1);
  }

  /**
  *
  **/
  this.count = (key) => {
    var n = 0;
    if(!includes(this.keys, key, { casecmp: true } )){
      return n;
    }
    for (var i = 0; i < this.pairs.length; i++) {
      if(this.pairs[i].key.toUpperCase() === key.toUpperCase()){
        n = n + 1;
      } 
    }
    return n;
  }
};

function includes(array, value, options) {
  for(var e in array){
    if(options && options.casecmp){
      if(array[e].toUpperCase() === value.toUpperCase()) return true;
    }
      if(array[e] === value) return true;  
  }
  return false;
};
exports = module.exports = Parsed;