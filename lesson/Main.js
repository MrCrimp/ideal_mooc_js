

import * as Existence010 from 'Existence010';

/** Uncomment these lines to instantiate other existences: */
//import existence.Existence020;
//import existence.Existence030;
//import existence.Existence031;
//import existence.Existence032;
//import existence.Existence040;
//import existence.Existence050;

/**
 * instantiates an Existence.,
 * runs the Existence step by step in a loop
 * and prints the Existence's activity as it runs.
 */

		/** Change this line to instantiate another existence: */
		let existence = new Existence010();
		//Existence existence = new Existence020();
		//Existence existence = new Existence030();
		//Existence existence = new Existence031();
		//Existence existence = new Existence032();
		//Existence existence = new Existence040();
		//Existence existence = new Existence050();
		//Existence existence = new Existence051();
		
		/** Change this line to adjust the number of cycles of the loop: */
		for(let i = 0; i < 20 ; i++) {
			let stepTrace = existence.step();
			console.log( i,": ", stepTrace );
		}

