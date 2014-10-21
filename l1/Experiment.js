
/*
  An experiment that can be chosen by the agent.
 */
class Experiment {

	this.label = null;
	
	constructor (label){
		this.label = label;
	}
	
	getLabel(){
		return this.label;
	}
	
	exports getLabel;
}
