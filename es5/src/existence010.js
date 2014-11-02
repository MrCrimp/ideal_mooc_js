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

