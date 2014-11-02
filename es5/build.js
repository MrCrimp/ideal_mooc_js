"use strict";


  var Existence010 = function Existence010() {
      var self = this;
      this.mood = null;
      this.selfSatisfactionCounter = 0;
      this.previousExperience;
	
      this.EXPERIENCES = []; 
      this.RESULTS = []; 
      this.INTERACTIONS = []; 
	
      this.BOREDOME_LEVEL = 4;
      
      this.LABEL_E1 = "e1";
      this.LABEL_E2 = "e2";
      this.LABEL_R1 = "r1";
      this.LABEL_R2 = "r2";
      
      this.Mood = {
          SELF_SATISFIED: 'SELF_SATISFIED',
          FRUSTRATED: 'FRUSTRATED',
          BORED: 'BORED',
          PAINED: 'PAINED',
          PLEASED: 'PLEASED'
	
      };
	
      this.step = function() {

          var _experience = this.previousExperience;

          if (this.mood == this.Mood.BORED) {
              _experience = this.getOtherExperience(_experience);
              this.selfSatisfactionCounter = 0;
          }

          var _anticipatedResult = this.predict(_experience);

          var _result = this.returnResult010(_experience);

          this.addOrGetPrimitiveInteraction(_experience, _result);

          if (_anticipatedResult && _result.label == _anticipatedResult.label) {
              this.mood = this.Mood.SELF_SATISFIED;
              this.incSelfSatisfactionCounter();
          }
          else {
              this.mood = this.Mood.FRUSTRATED;
              this.selfSatisfactionCounter = 0;
          }
          if (this.selfSatisfactionCounter >= this.BOREDOME_LEVEL)
              this.mood = this.Mood.BORED;

          this.previousExperience = _experience;
        
          return _experience.label 
                    + _result.label + " " + this.mood;
      };
      
      this.getMoodLabel = function() {
          var _Mood = this.mood;
          switch (this.mood) {
              case this.Mood.SELF_SATISFIED:
                  return "SELF_SATISFIED";
              case this.Mood.FRUSTRATED:
                  return "FRUSTRATED";
              case this.Mood.BORED:
                  return "BORED";
              case this.Mood.PAINED:
                  return "PAINED";
              case this.Mood.PLEASED:
                  return "PLEASED";
              default:
                  return "";
          }
      };
      
      this.incSelfSatisfactionCounter = function() {
         this.selfSatisfactionCounter++;
      };
      
      this.returnResult010 = function(experience) {
          if (experience.label === this.addOrGetExperience(this.LABEL_E1).label)
              return this.createOrGetResult(this.LABEL_R1);
          else
              return this.createOrGetResult(this.LABEL_R2);
      };
      
      this.initExistence = function() {
         var _e1 = this.addOrGetExperience(this.LABEL_E1);
         this.addOrGetExperience(this.LABEL_E2);
         this.previousExperience = _e1;
     };
      
      this.addOrGetPrimitiveInteraction =function(experience, result) {
        
          var _interaction = this.addOrGetInteraction((experience.label||"")  + result.label);
          _interaction.experience = (experience);
          _interaction.result =(result);
          return _interaction;
      };
      
      this.addOrGetInteraction = function(label) {
         if (!self.INTERACTIONS.hasKey("label", label))
             self.INTERACTIONS.push( self.createInteraction(label) );
         return self.INTERACTIONS.forKey("label",label)
     };
      
      this.createInteraction = function(label){
        return new Interaction010(label);
      };
      
      this.predict = function(experience) {
         var _interaction2 = null;
         var _anticipatedResult2 = null;

         _interaction2 = self.INTERACTIONS.filter( function(i) {
               return (i.experience.label == experience.label)
         })[0];
         
         if (_interaction2)
             _anticipatedResult2 = _interaction2.result;

         return _anticipatedResult2;
     };
    
      this.addOrGetExperience =  function(label) {
         if (!this.EXPERIENCES.hasKey("label", label))
             this.EXPERIENCES.push( this.createExperience(label) );
         return this.EXPERIENCES.forKey("label",label);
     };
      
      this.createExperience = function(label) {
          return new Experiment(label);
      };
      
      this.getOtherExperience = function(experience) {
          var _otherExperience = null;
          var match = false;
        
          _otherExperience = this.EXPERIENCES.filter( function(e) {
            return (e.label != experience.label) 
          })[0];
          
          return _otherExperience;
      };
      
      this.createOrGetResult = function(label) {
         if ( !this.RESULTS.hasKey("label", label) )
             this.RESULTS.push( new Result(label) );
         return this.RESULTS.forKey("label",label);
      };
      
      this.initExistence();
	};



/*
  An experiment that can be chosen by the agent.
 */
 "use strict";

function Experiment(label) {
       this.label = label;
};


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

"use strict";

function Result(label) {
       this.label = label;
};
