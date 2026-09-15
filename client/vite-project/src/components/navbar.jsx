import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {
	const navigate = useNavigate();
	const [loggingOut, setLoggingOut] = useState(false);

	const handleLogout = async () => {
		setLoggingOut(true);

		try {
			await api.post("/customers/logout");
		} finally {
			navigate("/login", { replace: true });
			setLoggingOut(false);
		}
	};

	return (
		<aside className="flex w-full flex-col border-b border-gray-200 bg-white px-6 py-5 lg:min-h-screen lg:w-60 lg:border-b-0 lg:border-r lg:px-5 lg:py-8">
			<div>
				<p className="text-lg font-semibold tracking-tight text-gray-900">Shopkart</p>
				<p className="mt-1 text-xs uppercase tracking-wider text-gray-400">Customer portal</p>
			</div>

			<nav className="mt-8 flex gap-2 lg:flex-col" aria-label="Demo navigation">
				<a href="#account" className="rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900">
					Account
				</a>
				<a href="#orders" className="rounded-md px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
					Orders
				</a>
				<a href="#settings" className="rounded-md px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
					Settings
				</a>
			</nav>

			<button
				type="button"
				onClick={handleLogout}
				disabled={loggingOut}
				className="mt-8 rounded-md border border-gray-200 px-3 py-2 text-left text-sm text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 lg:mt-auto"
			>
				{loggingOut ? "Logging out..." : "Log out"}
			</button>
		</aside>
	);
}

export default Navbar;
