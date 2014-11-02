"use strict";


  var Existence020 = function Existence020() {
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

		var experience = this.previousExperience;
          
		if (this.mood === this.Mood.BORED || this.mood === this.Mood.PAINED){
			experience = this.getOtherExperience(experience);
            this.selfSatisfactionCounter = 0;
        }
          
        var anticipatedResult = this.predict(experience);
          
		var result = this.returnResult010(experience);
	
		var enactedInteraction = this.addOrGetPrimitiveInteraction(experience, result);
		
        if (anticipatedResult && result.equals(anticipatedResult) ) {
            this.mood = this.Mood.SELF_SATISFIED;
            this.incSelfSatisfactionCounter();
        }else if (enactedInteraction.valence >= 0){
			this.mood = (this.Mood.PLEASED);
            this.incSelfSatisfactionCounter();
        }else{
			this.mood = this.Mood.PAINED;
        }
          
        if (this.selfSatisfactionCounter >= this.BOREDOME_LEVEL)
              this.mood = this.Mood.BORED;
		
        this.previousExperience = (experience);
		
		return experience.label + result.label + " " + this.mood;
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
          
        var e1 = this.addOrGetExperience(this.LABEL_E1);
		var e2 = this.addOrGetExperience(this.LABEL_E2);
		var r1 = this.createOrGetResult(this.LABEL_R1);
		var r2 = this.createOrGetResult(this.LABEL_R2);
		/** Change the valence of interactions to change the agent's motivation */
		this.addOrGetPrimitiveInteraction(e1, r1, 1);  
		this.addOrGetPrimitiveInteraction(e1, r2, 1);
		this.addOrGetPrimitiveInteraction(e2, r1, -1);
		this.addOrGetPrimitiveInteraction(e2, r2, 1);		
		this.previousExperience = (e1);
     };
      
      this.addOrGetPrimitiveInteraction =function(experience, result,valence) {
        
        var label = experience.label + result.label;
		if (!this.INTERACTIONS.hasKey("label",label)){
			var interaction = this.createInteraction(label);
			interaction.experience = (experience);
			interaction.result = (result);
			interaction.valence = (valence);
			this.INTERACTIONS.push(interaction);			
		}
		var interaction = this.INTERACTIONS.forKey("label",label);
		return interaction;
      };
      
      this.addOrGetInteraction = function(label) {
         if (!self.INTERACTIONS.hasKey("label", label))
             self.INTERACTIONS.push( self.createInteraction(label) );
         return self.INTERACTIONS.forKey("label",label)
     };
      
      this.createInteraction = function(label){
        return new Interaction020(label);
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

