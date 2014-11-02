
"use strict";

var Interaction010 = function() {
  var Interaction010 = function Interaction010(label) {
      var self = this;
      this.label = label;
      this.experience = null;
      this.result = null;
      this.toString = function(){       
        return self.experience.label + self.result.label;
      }
	};

  return Interaction010;
}();

