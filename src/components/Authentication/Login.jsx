import { useContext, useState } from "react";
// ROUTER
import { Link, useNavigate } from "react-router-dom";
import { RiShoppingCartFill } from "react-icons/ri";
import { IoMdSad } from "react-icons/io";
// FIREBASE
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig/firebase";
import { MyContext } from "../../App";
import { toastLoginSuccess } from "../utilities/RequiredFunctions";

// ------------------------------------------------------

function Login() {
	const { setUserName, setAdmin } = useContext(MyContext);
	const [submitting, setSubmitting] = useState(false);

	const [errorMsg, setErrorMsg] = useState("");
	const navigateTo = useNavigate();
	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	// ------------------------------------------------------
	// **************** HANDLE LOGIN SUBMIT ****************
	// ------------------------------------------------------
	const handleSubmit = async (e) => {
		e.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setSubmitting(true);
		try {
			// VALIDATAING ENTERED DETAILS
			if (!values.email || !values.password) {
				throw new Error("Please fill all fields");
			}
			if (!emailRegex.test(values.email)) {
				throw new Error("Please enter a valid email address");
			}

			// ATTEMPT TO SINGIN WITH ENTERED DETAILS
			const loggedInUser = await signInWithEmailAndPassword(
				auth,
				values.email,
				values.password,
			);

			// UPDATING USER NAME
			const currentUserName = loggedInUser.user.displayName;
			setUserName(currentUserName);

			// CHECK IF THE USER IS AN ADMIN
			const env = await import.meta.env;
			const adminEmail = env.VITE_REACT_APP_ADMIN_EMAIL;

			if (adminEmail && loggedInUser.user.email === adminEmail) {
				setAdmin(true);
				console.log("%c ✔ User is a admin", "color:#bada55");
			} else {
				setAdmin(false);
				console.log("%c ❌ User is not an admin", "color:tomato");
			}

			toastLoginSuccess();

			// SAVE USERDATA TO LOCAL STORAGE
			localStorage.setItem("user", JSON.stringify(loggedInUser));

			// NAVIGATE TO HOME IF LOGIN SUCCESS
			navigateTo("/");
			console.log("%c ✔ Authentication successful", "color: #bada55");
		} catch (error) {
			console.error(error);
			setErrorMsg(error.message);
			console.log("%c ❌ Authentication Failed", "color: tomato");
		}
	};

	// ------------------------------------------------------

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
				<form className="flex flex-col border py-8 px-8  w-[90%] md:w-[40%] lg:w-[32%] mt-10 rounded-lg shadow-2xl gap-2 ">
					<h1 className="text-2xl font-semibold">Login</h1>

					<input
						type="email"
						placeholder="Email Id"
						className="border py-2 px-3 mt-2 rounded-lg  outline-blue-300"
						value={values.email}
						onChange={(event) =>
							setValues((prev) => ({
								...prev,
								email: event.target.value,
							}))
						}
					/>
					<input
						type="password"
						placeholder="Password"
						className="border py-2 px-3 mt-2 rounded-lg outline-blue-300"
						value={values.password}
						onChange={(event) =>
							setValues((prev) => ({
								...prev,
								password: event.target.value,
							}))
						}
					/>
					<button
						className="bg-yellow-400 p-2 mt-3 rounded-lg outline-blue-300 hover:bg-yellow-500 active:bg-yellow-400"
						onClick={(e) => !submitting && handleSubmit(e)}
						disabled={submitting}
					>
						{submitting ? "Submitting..." : "Login"}
					</button>
					{/*Error Message*/}
					<span className="text-red-500 font-semibold mt-2 flex items-center gap-2">
						{errorMsg.length > 0 && (
							<IoMdSad className="text-2xl animate-bounce" />
						)}
						{errorMsg}
					</span>
					<p className="">
						New to BlinkMart?
						<Link
							to="/signup"
							className="font-semibold text-orange-500 ml-2"
						>
							Create account
						</Link>
					</p>
					<Link to="/" className="text-md underline opacity-40 mt-1">
						Continue as a guest
					</Link>
				</form>
			</div>
		</section>
	);
}

export default Login;
