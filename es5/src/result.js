"use strict";

function Result(label) {
    var self = this;
    this.label = label;
    this.equals = function(other){
        return other.label === self.label;
    };
};
