Array.prototype.last = function(){
    return this[this.length-1]
}

Array.prototype.hasKey = function(key, label){
    return this.filter(function(e){
        return e[key] === label;
    }).length;
}

Array.prototype.forKey = function(key,label){
    return this.filter(function(item){
        return item[key] === label;
    })[0]
}

"use strict";



/**
 * instantiates an Existence.,
 * runs the Existence step by step in a loop
 * and prints the Existence's activity as it runs.
 */

/** Change this line to instantiate another existence: */
var _existence = new Existence010();
//Existence existence = new Existence020();
//Existence existence = new Existence030();
//Existence existence = new Existence031();
//Existence existence = new Existence032();
//Existence existence = new Existence040();
//Existence existence = new Existence050();
//Existence existence = new Existence051();

/** Change this line to adjust the number of cycles of the loop: */
for(var _i = 0; _i < 20 ; _i++) {
    var _stepTrace = _existence.step();
    console.log( _i," : ", _stepTrace );
}
