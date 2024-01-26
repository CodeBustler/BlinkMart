import React, { useContext, useEffect, useState } from "react";
import NavbarForAdmin from "../Navbar/NavbarForAdmin";
import { MyContext } from "../../App";

function AddHeroBanners() {
	const { bannersData } = useContext(MyContext);
	const [errorMsg, setErrorMsg] = useState("");
	const [heroData, setHeroData] = useState([]);

	useEffect(() => {
		if (bannersData && bannersData.length > 0) {
			const heroDataRef = [
				bannersData[0].hero1 || "",
				bannersData[0].hero2 || "",
				bannersData[0].hero3 || "",
				bannersData[0].hero4 || "", // Uncomment if needed
			];
			setHeroData(heroDataRef);
		} else {
			setErrorMsg("No data available"); // Set error message
		}
	}, [bannersData]); // Run effect when bannersData changes

	console.log(heroData);
	return (
		<>
			<NavbarForAdmin />
			<div className="grid place-items-center">
				<div className=" flex flex-col border py-8 px-8  w-[90%] md:w-[40%] lg:w-[32%] mt-10 rounded-lg shadow-2xl gap-2 ">
					<h1 className="font-semibold text-2xl mb-4 text-gray-600">
						Update Hero Image (Links)
					</h1>
					<div className="flex flex-col gap-2">
						<input
							type="text"
							placeholder="Hero Image 1"
							value={heroData[0]}
							onChange={(e) =>
								setHeroData((prevData) => [
									...prevData,
									e.target.value,
								])
							}
							className="border py-2 px-3 mt-2 rounded-lg outline-blue-300"
						/>
						<input
							type="text"
							placeholder="Hero Image 2"
							value={heroData[1]}
							onChange={(e) =>
								setHeroData((prevData) => [
									...prevData,
									e.target.value,
								])
							}
							className="border py-2 px-3 mt-2 rounded-lg outline-blue-300"
						/>
						<input
							type="text"
							placeholder="Hero Image 3"
							value={heroData[2]}
							onChange={(e) =>
								setHeroData((prevData) => [
									...prevData,
									e.target.value,
								])
							}
							className="border py-2 px-3 mt-2 rounded-lg outline-blue-300"
						/>
						<input
							type="text"
							placeholder="Hero Image 4"
							value={heroData[3]}
							onChange={(e) =>
								setHeroData((prevData) => [
									...prevData,
									e.target.value,
								])
							}
							className="border py-2 px-3 mt-2 rounded-lg outline-blue-300"
						/>
					</div>
					<button
						className="bg-yellow-400 p-2 mt-7 rounded-lg outline-blue-300 hover:bg-yellow-500 active:bg-yellow-400"
						onClick={(e) => handleUpdateHero(e)}
					>
						Update
					</button>
				</div>
			</div>
		</>
	);
}

export default AddHeroBanners;
