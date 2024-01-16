import React from "react";
import ReactLoading from "react-loading";

function Loader() {
	return (
		<div className="grid place-items-center mt-10">
			<ReactLoading
				type={"spin"}
				color={"orange"}
				height={50}
				width={50}
			/>
		</div>
	);
}

export default Loader;
