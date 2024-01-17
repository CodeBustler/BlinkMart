import React, { useEffect, useState } from "react";

const AnimatedNumber = ({ target, duration }) => {
	const [animatedValue, setAnimatedValue] = useState(0);

	useEffect(() => {
		const start = new Date().getTime();
		const end = start + duration;

		function update() {
			const now = new Date().getTime();
			const progress = Math.min(1, (now - start) / duration);
			const value = Math.floor(progress * target);

			setAnimatedValue(value);

			if (progress < 1) {
				requestAnimationFrame(update);
			}
		}
		update();
	}, [target, duration]);

	return <div>{animatedValue}</div>;
};

export default AnimatedNumber;
