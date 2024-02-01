import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile_avatar from "../../assets/profile_avatar.png";
import { IoMdTime } from "react-icons/io";

function UserDetail() {
	const [userData, setUserData] = useState();
	const navigateTo = useNavigate();

	// -------------------------------------------------------------
	// ***************** DATA FROM LOCAL STORAGE *****************
	// -------------------------------------------------------------
	useEffect(() => {
		const userFromLS = JSON.parse(localStorage.getItem("user"));
		if (userFromLS) {
			setUserData(userFromLS);
		} else {
			navigateTo("/login");
		}
	}, []);

	// CHECKS THE USERDATA BEFORE DESTUCTURING
	const { email, displayName, createdAt, lastLoginAt } = userData?.user || {};

	// ACCOUNT CREATED_AT
	const createDateStamp = new Date(parseInt(createdAt, 10));
	const createdTime = createDateStamp.toLocaleTimeString("en-US");
	const createdDay = createDateStamp.toLocaleDateString("en-US", {
		weekday: "short",
	});
	const createdDate = createDateStamp.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	// LAST LOGIN_AT
	const lastLoginStamp = new Date(parseInt(lastLoginAt, 10));
	const lastLoginTime = lastLoginStamp.toLocaleTimeString("en-US");
	const lastLoginDay = lastLoginStamp.toLocaleDateString("en-US", {
		weekday: "short",
	});
	const lastLoginDate = lastLoginStamp.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	// -------------------------------------------------------------
	return (
		<>
			{/*CONTAINER*/}
			<div className="flex flex-col md:flex-row items-center justify-center gap-7 md:gap-36 md:mx-52 mt-10">
				<div className="flex items-center gap-5 flex-col">
					<img
						src={profile_avatar}
						alt="user_avatar"
						className="block w-[150px] "
					/>
					<div className="font-bold text-xl text-gray-800 uppercase">
						{displayName}
					</div>
				</div>
				<div className="w-[90%] md:w-auto">
					<div className=" border-b-2 border-orange-400 font-semibold  mt-5">
						Account Holder
					</div>

					<div className="font-semibold text-gray-500 capitalize">
						{displayName}
					</div>
					<div className=" border-b-2 border-orange-400 font-semibold mt-4">
						Email
					</div>
					<div className="mt-1 font-semibold text-gray-500">
						{email}
					</div>
					<div className=" border-b-2 border-orange-400 font-semibold mt-4">
						Account Created
					</div>
					<div className="mt-1 font-semibold text-gray-500">{` ${createdDate} | ${createdDay}   🕑 ${createdTime} `}</div>
					<div className=" border-b-2 border-orange-400 font-semibold mt-4">
						Account Last Login
					</div>
					<div className="mt-1 font-semibold text-gray-500">{` ${lastLoginDate} | ${lastLoginDay}   🕑 ${lastLoginTime} `}</div>
				</div>
			</div>
		</>
	);
}

export default UserDetail;
