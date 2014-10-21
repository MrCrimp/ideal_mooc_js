
import Experiment from 'Experiment';

import Result from 'Result';

/**
 * An interaction010 is the association of an experience with a result.
 */
export class Interaction010 
{
	constructor( label){
		this.label = label;
	}
	
	 getLabel(){
		return this.label;
	}
	
	 getExperience() {
		return this.experience;
	}

	 setExperience( experience) {
		this.experience = experience;
	}

	 getResult() {
		return this.result;
	}

	 setResult( result) {
		this.result = result;
	}

	 tostring(){
		return this.experience.getLabel() || this.result.getLabel();
	}
}
