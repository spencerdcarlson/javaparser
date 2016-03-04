function Annotations(){
	this._annotations = [
	 	new Annotation('IFQA', false),
	    new Annotation('Command', true),
	    new Annotation('Chapter', true),
	    new Annotation('Question', true),
	    new Annotation('QText', true),
	    new Annotation('Option', true),
	    new Annotation('Answer', true),
	    new Annotation('Exp', true)
	];
	this.add = (tag, track) => {
		this._annotations.push(new Annotation(tag, track));
	}
	this.get = () => {
		return this._annotations;
	}
	this.test = (cmd) => {
		var result = false;
		for(var a in this._annotations){
			if(this._annotations[a]._track){
				var test = this._annotations[a]._tag;
				if(this._annotations[a].test(cmd)){
					result = cmd;
					break;
				}
			}
		}
		return result;
	}
};

function Annotation(tag, track){
	this._tag = tag;
	this._track = track;
	this.test = (string) => {
		return new RegExp('^@'+this._tag+'$','i').test(string);
	}
};



exports = module.exports = Annotations