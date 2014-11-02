"use strict";


  var Existence020 = function Existence010() {
      this.mood = null;
      this.selfSatisfactionCounter = 0;
      this.previousExperience;

      this.EXPERIENCES = []; // Map<string ,Experiment> EXPERIENCES = new HashMap<string ,Experiment>();
      this.RESULTS = []; // Map<string ,Result> RESULTS = new HashMap<string ,Result>();
      this.INTERACTIONS = []; // Map<string , Interaction> INTERACTIONS = new HashMap<string , Interaction>() ;
	
      this.BOREDOME_LEVEL = 4;
      
      this.LABEL_E1 = "e1";
      this.LABEL_E2 = "e2";
      this.LABEL_R1 = "r1";
      this.LABEL_R2 = "r2";
      
      
      
      this.Mood = {
          SELF_SATISFIED: 'SELF_SATISFIED',
          FRUSTRATED: 'SELF_SATISFIED',
          BORED: 'SELF_SATISFIED',
          PAINED: 'SELF_SATISFIED',
          PLEASED: 'SELF_SATISFIED'
	
      };
	
      this.step = function() {

          var _experience = this.previousExperience;

          if (this.getMood() == this.Mood.BORED) {
              _experience = this.getOtherExperience(_experience);
              this.selfSatisfactionCounter = 0;
          }

          var _anticipatedResult = this.predict(_experience);

          var _result = this.returnResult010(_experience);

          this.addOrGetPrimitiveInteraction(_experience, _result);

          if (_result == _anticipatedResult) {
              this.mood = this.Mood.SELF_SATISFIED;
              this.incSelfSatisfactionCounter();
          }
          else {
              this.mood = this.Mood.FRUSTRATED;
              this.selfSatisfactionCounter = 0;
          }
          if (this.selfSatisfactionCounter() >= this.BOREDOME_LEVEL)
              this.mood = this.Mood.BORED;

          this.previousExperience = _experience;
        
          return _experience.getLabel() 
                    || _result.getLabel() + " " + this.getMoodLabel();
      };
      
      this.getMoodLabel = function() {
          var _Mood = this.Mood;
          switch (this.mood) {
              case _Mood.SELF_SATISFIED:
                  return "SELF_SATISFIED";
              case _Mood.FRUSTRATED:
                  return "FRUSTRATED";
              case _Mood.BORED:
                  return "BORED";
              case _Mood.PAINED:
                  return "PAINED";
              case _Mood.PLEASED:
                  return "PLEASED";
              default:
                  return "";
          }
      };
      
      this.incSelfSatisfactionCounter = function() {
         this.selfSatisfactionCounter++;
      };
      
      this.returnResult010 = function(experience) {
          if (experience === this.addOrGetExperience(this.LABEL_E1))
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
        
          var _interaction = this.addOrGetInteraction(experience.label  || result.label);
          _interaction.setExperience(experience);
          _interaction.setResult(result);
          return _interaction;
      };
      
      this.addOrGetInteraction = function(label) {
         if (!this.INTERACTIONS[label])
             this.INTERACTIONS[label] = this.createInteraction(label);
         return this.INTERACTIONS[label];
     };
      this.createInteraction = function(label){
        return new Interaction010(label);
      };
      
      this.predict = function(experience) {
         var _interaction2 = null;
         var _anticipatedResult2 = null;

         this.INTERACTIONS.forEach( function(_interaction2) {
           return function(i) {
               if (i.getExperience() == experience)
                   _interaction2 = i;
           };
         }(_interaction2));
         
         if (_interaction2 !== null)
             _anticipatedResult2 = _interaction2.getResult();

         return _anticipatedResult2;
     };
    
      this.addOrGetExperience =  function(label) {
         if (!this.EXPERIENCES[label])
             this.EXPERIENCES[label] = this.createExperience(label);
         return this.EXPERIENCES[label];
     };
      
      this.createExperience = function(label) {
          return new Experiment(label);
      };
      
      this.getOtherExperience = function(experience) {
          var _otherExperience = null;
          
          this.EXPERIENCES.some( function(_otherExperience) {
            return function(e) {
                if (e != experience) {
                    _otherExperience = e;
                    return true;
                }
            };
          }(_otherExperience));
          
          return _otherExperience;
      };
      
      this.createOrGetResult = function(label) {
         if ( !this.RESULTS[label])
             this.RESULTS[label] = new Result(label);
         return this.RESULTS[label];
      };
      
      this.initExistence();
	};

