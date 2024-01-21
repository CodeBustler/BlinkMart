import { useState } from "react";
// ROUTER
import { Link, useNavigate } from "react-router-dom";
// FIREBASE
import { auth, fireDB } from "../../firebaseConfig/firebase";
import { signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// ICONS
import { RiShoppingCartFill } from "react-icons/ri";
import { IoMdSad } from "react-icons/io";
import { toast } from "react-toastify";
import { toastSignUpSuccess } from "../Utilities/RequiredFunctions";

// ---------------------------------------------------------------

function SignUp() {
	const [errorMsg, setErrorMsg] = useState("");
	const navigateTo = useNavigate();
	const [inputValues, setInputValues] = useState({
		name: "",
		email: "",
		city: "",
		areaPinCode: "",
		password: "",
	});

	// ---------------------------------------------------------------
	// ******************** HANDLE SIGNUP SUBMIT *********************
	// ---------------------------------------------------------------
	const handleSubmit = async (e) => {
		e.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!inputValues.name || !inputValues.email || !inputValues.password) {
			setErrorMsg("Please fill all fields");
		} else if (!emailRegex.test(inputValues.email)) {
			setErrorMsg("Please enter a valid email address");
		} else {
			setErrorMsg("");
			try {
				// CREATING NEW ACCOUNT (WITH EMAIL & PASSWORD)
				const newUser = await createUserWithEmailAndPassword(
					auth,
					inputValues.email,
					inputValues.password,
				);
				// UPDATING DISPLAY NAME
				const userDetail = newUser.user;
				await updateProfile(userDetail, {
					displayName: inputValues.name,
				});

				toastSignUpSuccess();
				navigateTo("/login");

				// STORING USER DATA IN FIRESTORE
				const user = {
					name: inputValues.name,
					email: newUser.user.email,
					uid: newUser.user.uid,
					city: inputValues.city,
					areaPinCode: inputValues.areaPinCode,
					cart: {
						userCartProducts: [],
						userCartProductsCount: [],
					},
				};
				// ADDING NEW USER_DOC TO COLLECTION "USERS"
				const userRef = collection(fireDB, "users");
				await addDoc(userRef, user);
			} catch (error) {
				setErrorMsg(error.message);
			}
		}
	};

	return (
		<section className="h-[100vh]">
			{/*CONTAINER*/}
			<div className="flex flex-col items-center pt-10">
				{/*LOGO*/}
				<Link className="font-bold flex items-center gap-1  ">
					<RiShoppingCartFill className=" text-3xl text-orange-400" />
					<span className="text-3xl">BlinkMart</span>
				</Link>
				{/*FORM*/}
				<form
					action=""
					className="flex flex-col border py-8 px-8  w-[90%] md:w-[40%] lg:w-[32%] mt-10 rounded-lg shadow-2xl gap-2 "
				>
					<h1 className="text-2xl font-semibold">Create Account</h1>
					<input
						type="text"
						placeholder="Full name"
						className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300"
						required
						onChange={(event) =>
							setInputValues((prev) => ({
								...prev,
								name: event.target.value,
							}))
						}
					/>

					<div className="flex gap-5 w-full ">
						<input
							type="text"
							placeholder="City name"
							className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300 w-full"
							required
							onChange={(event) =>
								setInputValues((prev) => ({
									...prev,
									city: event.target.value,
								}))
							}
						/>
						<input
							type="text"
							placeholder="ZIP Code"
							className="border py-2 px-3 mt-2 rounded-lg outline-blue-300 w-full"
							required
							onChange={(event) =>
								setInputValues((prev) => ({
									...prev,
									areaPinCode: event.target.value,
								}))
							}
						/>
					</div>
					<input
						type="email"
						placeholder="Email Id"
						className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300"
						required
						onChange={(event) =>
							setInputValues((prev) => ({
								...prev,
								email: event.target.value,
							}))
						}
					/>
					<input
						type="password"
						placeholder="Password"
						className="border py-2 px-3 mt-2 rounded-lg outline-blue-300"
						required
						onChange={(event) =>
							setInputValues((prev) => ({
								...prev,
								password: event.target.value,
							}))
						}
					/>
					<button
						className="bg-yellow-400 p-2 mt-3 rounded-lg outline-blue-300 hover:bg-yellow-500 active:bg-yellow-400"
						onClick={(e) => {
							handleSubmit(e);
						}}
					>
						Submit
					</button>

					<span className="text-red-500 font-semibold mt-2 flex items-center gap-2">
						{errorMsg.length > 0 && (
							<IoMdSad className="text-2xl animate-bounce" />
						)}
						{errorMsg}
					</span>
					<p className="mt-2">
						Already have an account?
						<Link
							to="/login"
							className="font-semibold text-orange-500 ml-1"
						>
							Sign In
						</Link>
					</p>
				</form>
			</div>
		</section>
	);
}

export default SignUp;
