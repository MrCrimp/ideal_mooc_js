
"use strict";

var Interaction020 = function() {
  var Interaction010 = function Interaction010(label) {
      this.label = label;
      this.experience = null;
      this.result = null;
      this.toString = function(){
        return this.experience.label || this.result.label;
      }
	};

  return Interaction010;
}();

