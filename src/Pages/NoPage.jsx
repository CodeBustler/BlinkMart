// ROUTER
import { Link } from "react-router-dom";
// ICONS
import { RiShoppingCartFill } from "react-icons/ri";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
// ---------------------------------------------------------------

function NoPage() {
	return (
		<div className="my-10">
			{/*LOGO*/}
			<Link
				to="/"
				className="font-bold text-2xl flex items-center justify-center gap-1 b "
			>
				<RiShoppingCartFill className="text-3xl text-orange-400" />
				<span className="">BlinkMart</span>
			</Link>
			{/*RETURN HOME*/}
			<div className="flex items-center justify-center gap-5">
				<BsFillQuestionOctagonFill className="text-3xl md:text-5xl text-orange-500 " />
				<div className="mt-10">
					<h2 className="text-lg font-bold text-orange-500">
						Looking for something?
					</h2>
					<p className="text-lg">
						We're sorry. The Web address you entered is not a
						functioning page on our site.
					</p>
					<p className="mt-5 text-lg">
						Go to BlinkMart's
						<Link
							to="/"
							className="underline font-bold text-orange-500 mx-2"
						>
							Home
						</Link>
						Page
					</p>
				</div>
			</div>
		</div>
	);
}

export default NoPage;
