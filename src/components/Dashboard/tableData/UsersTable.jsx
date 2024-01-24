import React, { useContext } from "react";
import profile_avatar from "../../../assets/profile_avatar.png";

function UsersTable({ userDB }) {
	const env = import.meta.env;
	const adminEmail = env.VITE_REACT_APP_ADMIN_EMAIL;

	return (
		<>
			<div className="flex items-center justify-between sticky top-[64px] bg-white py-2 md:py-4 border-b-2 mb-5 z-20">
				<h2 className="text-xl font-bold my-3 text-center md:text-left">
					User Dashboard
				</h2>
			</div>
			<div>
				{userDB.map((user, index) => {
					console.log(user);
					return (
						<>
							<div
								key={index}
								className="border p-3 mb-4 flex items-center justify-between md:justify-start  gap-10"
							>
								<div className="flex items-center gap-5 md:min-w-[18%]">
									<img
										src={profile_avatar}
										alt=""
										className="w-[60px] md:w-[50px ]"
									/>
									<div>
										<div className="font-semibold">
											{user.name}
										</div>
										<div className="md:hidden">
											{user.email}
										</div>
										<small
											className={`${
												user.email === adminEmail
													? "text-orange-500"
													: ""
											}`}
										>
											{user.email === adminEmail
												? "Admin"
												: "User"}
										</small>
									</div>
								</div>

								<div className="hidden md:block md:min-w-[20%]">
									<div className="font-semibold">
										{user.email === adminEmail
											? "*****"
											: user.email}
									</div>
									<small>Email</small>
								</div>

								<div className="hidden md:block md:min-w-[14%]">
									<div className="font-semibold">
										{user.city}
									</div>
									<small>City</small>
								</div>
								<div className="hidden md:block md:min-w-[12%]">
									<div className="font-semibold">
										{user.areaPinCode}
									</div>
									<small>ZipCode</small>
								</div>
								<div className="hidden lg:block md:min-w-[15%]">
									<div className="font-semibold">
										{user.id}
									</div>
									<small>Firebase User Id</small>
								</div>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}

export default UsersTable;
