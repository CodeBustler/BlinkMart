// ICONS
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoTwitter } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io5";
import { IoLogoYoutube } from "react-icons/io5";
// ---------------------------------------------------------------

function CustomerService() {
	return (
		<section>
			<div className="container mx-auto my-3 p-4 ">
				<h2 className="text-2xl font-bold">
					Hello, What can we help you with?
				</h2>
				<h3 className="font-semibold text-xl my-5">
					Some thing you can do here
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mx-auto md:w-[90%] ">
					<div className="border border-2 p-3 rounded flex gap-5 cursor-pointer transition hover:outline-2  hover:outline hover:outline-gray-300">
						{/*Image*/}
						<img
							src="https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/Box-t3.png"
							alt="img"
							className="object-contain w-[25%] md:w-[20%]"
						/>
						{/*Content*/}
						<div className="flex flex-col justify-center">
							<h4 className="font-semibold text-lg">
								Your Orders
							</h4>
							<p>Track packages</p>
							<p>Edit or cancel orders</p>
						</div>
					</div>
					<div className="border border-2 p-3 rounded flex cursor-pointer transition hover:outline-2  hover:outline hover:outline-gray-300 gap-5">
						{/*Image*/}
						<img
							src="https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/returns-box-blue.png"
							alt="img"
							className="object-contain w-[25%] md:w-[20%]"
						/>
						{/*Content*/}
						<div className="flex flex-col justify-center">
							<h4 className="font-semibold text-lg">
								Returns and Refunds
							</h4>
							<p>Return or exchange items</p>
							<p>Print return mailing labels</p>
						</div>
					</div>
					<div className="border border-2 p-3 rounded flex cursor-pointer transition hover:outline-2  hover:outline hover:outline-gray-300  gap-5">
						{/*Image*/}
						<img
							src="https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/manage-address.png"
							alt="img"
							className="object-contain w-[25%] md:w-[20%]"
						/>
						{/*Content*/}
						<div className="flex flex-col justify-center">
							<h4 className="font-semibold text-lg">
								Manage Adresses
							</h4>
							<p>Update your addresses</p>
							<p>Add address, landmark details</p>
						</div>
					</div>
					<div className="border border-2 p-3 rounded flex cursor-pointer transition hover:outline-2  hover:outline hover:outline-gray-300 gap-5">
						{/*Image*/}
						<img
							src="https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/Payments_clear-bg-t3.png"
							alt="img"
							className="object-contain w-[25%] md:w-[20%]"
						/>
						{/*Content*/}
						<div className="flex flex-col justify-center">
							<h4 className="font-semibold text-lg">
								Payment Settings
							</h4>
							<p>Add or edit payment methods</p>
							<p>Change expired debit or credit card</p>
						</div>
					</div>
					<div className="border border-2 p-3 rounded flex cursor-pointer transition hover:outline-2  hover:outline hover:outline-gray-300 gap-5">
						{/*Image*/}
						<img
							src="https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/IN-your-account.png"
							alt="img"
							className="object-contain w-[25%] md:w-[20%]"
						/>
						{/*Content*/}
						<div className="flex flex-col justify-center">
							<h4 className="font-semibold text-lg">
								Account Settings
							</h4>
							<p>Change your email or password</p>
							<p>Update login information</p>
						</div>
					</div>
					<div className="border border-2 p-3 rounded flex cursor-pointer transition hover:outline-2  hover:outline hover:outline-gray-300 gap-5">
						{/*Image*/}
						<img
							src="https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/family_device.png"
							alt="img"
							className="object-contain w-[25%] md:w-[20%]"
						/>
						{/*Content*/}
						<div className="flex flex-col justify-center">
							<h4 className="font-semibold text-lg">
								Digital Services & Devices
							</h4>
							<p>Find devices help and support</p>
							<p>Troubleshoot device issues</p>
						</div>
					</div>
				</div>
			</div>
			{/*CONTACT US*/}
			<div className="container mx-auto my-12">
				<h2 className="text-2xl font-bold">Contact Us</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mx-auto md:w-[90%]">
					<div className="border border-2 p-5 rounded flex cursor-pointer transition hover:outline-2  hover:outline hover:outline-gray-300 gap-4 flex items-center  ">
						{/*Image*/}
						<FaPhoneVolume className="text-3xl text-blue-500" />

						{/*Content*/}
						<h4 className="font-semibold text-lg ">
							+91 90012 55555
						</h4>
					</div>
					<div className="border border-2 p-5 rounded flex cursor-pointer transition hover:outline-2  hover:outline hover:outline-gray-300 gap-4 flex items-center">
						{/*Image*/}
						<MdEmail className="text-3xl text-orange-500" />

						{/*Content*/}
						<h4 className="font-semibold text-lg ">
							contact@blinkmart.com
						</h4>
					</div>
					<div className="border border-2 p-5 rounded flex cursor-pointer transition hover:outline-2  hover:outline hover:outline-gray-300 gap-4 flex items-center">
						{/*Image*/}
						<IoIosChatbubbles className="text-3xl text-purple-500" />

						{/*Content*/}
						<h4 className="font-semibold text-lg ">
							Chat Support & Queries
						</h4>
					</div>
					<div className="flex items-center  gap-10 p-5 ">
						<a
							href="https://www.instagram.com/codebustler"
							target="_blank"
						>
							<IoLogoInstagram className=" text-2xl text-gray-500 hover:text-pink-600" />
						</a>
						<a
							href="https://www.twitter.com/codebustler"
							target="_blank"
						>
							<IoLogoTwitter className=" text-2xl text-gray-500 hover:text-blue-400" />
						</a>
						<a
							href="https://www.facebook.com/codebustler"
							target="_blank"
						>
							<IoLogoFacebook className=" text-2xl text-gray-500 hover:text-blue-500" />
						</a>

						<a
							href="https://www.youtube.com/@codebustler"
							target="_blank"
						>
							<IoLogoYoutube className=" text-2xl text-gray-500 hover:text-red-500" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CustomerService;
