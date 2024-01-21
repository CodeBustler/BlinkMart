import React, { useEffect, useState } from "react";

const AnimatedNumber = ({ target, duration }) => {
	// STATE TO HOLD THE CURRENT ANIMATED VALUE
	const [animatedValue, setAnimatedValue] = useState(0);

	// EFFECT TO ANIMATE THE NUMBER TOWARDS THE TARGET
	useEffect(() => {
		// GETTING START TIME AND END TIME FOR THE ANIMATION
		const start = new Date().getTime(); // Current Time (In Milliseconds)
		const end = start + duration; //e.g 1000, 2000 (In Milliseconds)

		// UPDATE FUNCTION TO CALCULATE PROGRESS AND SET THE ANIMATED VALUE
		function update() {
			const now = new Date().getTime();
			const progress = Math.min(1, (now - start) / duration);
			const value = Math.floor(progress * target);

			// SET THE ANIMATED VALUE
			setAnimatedValue(value);

			// CONTINUE UPDATING IF ANIMATION IS NOT COMPLETE
			if (progress < 1) {
				requestAnimationFrame(update);
			}
		}

		// INITIAL CALL TO UPDATE FUNCTION TO START ANIMATION
		update();
	}, [target, duration]);

	// RENDERING THE ANIMATED VALUE
	return <div>{animatedValue}</div>;
};

export default AnimatedNumber;
