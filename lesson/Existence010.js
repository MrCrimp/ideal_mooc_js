import Experiment from 'Experiment';
import Result from 'Result';
import Interaction010 from 'Interaction010';

/**
 * An Existence010 simulates a "stream of intelligence" made of a succession of Experiences and Results.
 * The Existence010 is SELF-SATISFIED when the Result corresponds to the Result it expected, and FRUSTRATED otherwise.
 * Additionally, the Existence0 is BORED when it has been SELF-SATISFIED for too long, which causes it to try another Experience.
 * An Existence1 is still a single entity rather than being split into an explicit Agent and Environment.
 */
export class Existence010 {
	

	constructor() {
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
	
		this.initExistence();
	}

	step() {

		let experience = this.getPreviousExperience();

		if (this.getMood() == this.Mood.BORED) {
			experience = this.getOtherExperience(experience);
			this.setSelfSatisfactionCounter(0);
		}

		let anticipatedResult = this.predict(experience);

		let result = this.returnResult010(experience);

		this.addOrGetPrimitiveInteraction(experience, result);

		if (result == anticipatedResult) {
			this.setMood(this.Mood.SELF_SATISFIED);
			this.incSelfSatisfactionCounter();
		}
		else {
			this.setMood(this.Mood.FRUSTRATED);
			this.setSelfSatisfactionCounter(0);
		}
		if (this.getSelfSatisfactionCounter() >= this.BOREDOME_LEVEL)
			this.setMood(this.Mood.BORED);

		this.setPreviousExperience(experience);

		return experience.getLabel() || result.getLabel() + " " + this.getMoodLabel();
	}

	getMood() {
		return this.mood;
	}

	getMoodLabel() {
		let Mood = this.Mood;
		switch (this.mood) {
			case Mood.SELF_SATISFIED:
				return "SELF_SATISFIED";
			case Mood.FRUSTRATED:
				return "FRUSTRATED";
			case Mood.BORED:
				return "BORED";
			case Mood.PAINED:
				return "PAINED";
			case Mood.PLEASED:
				return "PLEASED";
			default:
				return "";
		}
	}
	
	setMood(mood) {
		this.mood = mood;
	}

	getPreviousExperience() {
		return previousExperience;
	}

	setPreviousExperience(previousExperience) {
		this.previousExperience = previousExperience;
	}

	getSelfSatisfactionCounter() {
		return this.selfSatisfactionCounter;
	}
	 setSelfSatisfactionCounter(selfSatisfactionCounter) {
		this.selfSatisfactionCounter = selfSatisfactionCounter;
	}
	
	 incSelfSatisfactionCounter() {
		this.selfSatisfactionCounter++;
	}

	/**
	 * The Environment010
	 * E1 results in R1. E2 results in R2.
	 * @param experience: The current experience.
	 * @return The result of this experience.
	 */
	returnResult010(experience) {
		if (experience === this.addOrGetExperience(this.LABEL_E1))
			return this.createOrGetResult(this.LABEL_R1);
		else
			return this.createOrGetResult(this.LABEL_R2);
	}
	


	 initExistence() {
		let e1 = this.addOrGetExperience(this.LABEL_E1);
		this.addOrGetExperience(this.LABEL_E2);
		this.setPreviousExperience(e1);
	}

	/**
	 * Create an interaction as a tuple <experience, result>.
	 * @param experience: The experience.
	 * @param result: The result.
	 * @return The created interaction
	 */
	addOrGetPrimitiveInteraction( experience,  result) {
		let interaction = this.addOrGetInteraction(experience.getLabel()  || result.getLabel());
		interaction.setExperience(experience);
		interaction.setResult(result);
		return interaction;
	}

	/**
	 * Records an interaction in memory.
	 * @param label: The label of this interaction.
	 * @return The interaction.
	 */
	 addOrGetInteraction( label) {
		if (!this.INTERACTIONS[label])
			this.INTERACTIONS[label] = this.createInteraction(label);
		return this.INTERACTIONS[label];
	}

    createInteraction( label) {
		return new Interaction010(label);
	}

	/**
	 * Finds an interaction from its label
	 * @param label: The label of this interaction.
	 * @return The interaction.
	 */
    getInteraction( label) {
		return Ithis.NTERACTIONS[label];
	}

	/**
	 * Finds an interaction from its experience
	 * @return The interaction.
	 */
	 predict( experience) {
		let interaction = null;
		let anticipatedResult = null;

		this.INTERACTIONS.forEach( i => {
			if (i.getExperience() == experience)
				interaction = i;
		})
		
		if (interaction !== null)
			anticipatedResult = interaction.getResult();

		return anticipatedResult;
	}

	/**
	 * Creates a new experience from its label and stores it in memory.
	 * @param label: The experience's label
	 * @return The experience.
	 */
	 addOrGetExperience( label) {
		if (!this.EXPERIENCES[label])
			this.EXPERIENCES[label] = this.createExperience(label);
		return this.EXPERIENCES[label];
	}

	createExperience( label) {
		return new Experiment(label);
	}

	/**
	 * Finds an experience different from that passed in parameter.
	 * @param experience: The experience that we don't want
	 * @return The other experience.
	 */
	getOtherExperience( experience) {
		let otherExperience = null;
		
		this.EXPERIENCES.some( e => {
			if (e != experience) {
				otherExperience = e;
				return true;
			}
		})
		
		return otherExperience;
	}

	/**
	 * Creates a new result from its label and stores it in memory.
	 * @param label: The result's label
	 * @return The result.
	 */
	 createOrGetResult( label) {
		if ( !this.RESULTS[label])
			this.RESULTS[label] = new Result(label);
		return this.RESULTS[label];
	}

}
	

