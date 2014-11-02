"use strict";


Array.prototype.hasKey = function(key, label){
    return this.filter(function(e){
        return e[key] === label;
    }).length;
}

// should be .findBy
Array.prototype.forKey = function(key,label){
    return this.filter(function(item){
        return item[key] === label;
    })[0]
}

window.println = function(i, sep, msg){
        var div = document.createElement("div");
        div.innerHTML = (i + sep + msg);
        document.body.appendChild(div)
}

/**
 * instantiates an Existence.,
 * runs the Existence step by step in a loop
 * and prints the Existence's activity as it runs.
 */

/** Change this line to instantiate another existence: */
window.println("","","<br>_______ LESSON 1: __________________<br>");
run( new Existence010() );

window.println("","","<br>_______ LESSON 2: __________________<br>");
run( new Existence020() );

//Existence existence = new Existence030();
//Existence existence = new Existence031();
//Existence existence = new Existence032();
//Existence existence = new Existence040();
//Existence existence = new Existence050();
//Existence existence = new Existence051();

function run(_existence){
    /** Change this line to adjust the number of cycles of the loop: */
    for(var i = 0; i < 20 ; i++) {
        var stepTrace = _existence.step();
        window.println( i," : ", stepTrace );
    }
}