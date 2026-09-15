import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useAuth } from "../context/AuthContext";

function Home() {
	const navigate = useNavigate();
	const { customer, loading, error } = useAuth();

	useEffect(() => {
		if (error?.response?.status === 401 || error?.response?.status === 404) {
			navigate("/login", { replace: true });
		}
	}, [error, navigate]);

	if (error) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
				<p className="text-sm text-red-600">We could not load your account details.</p>
			</main>
		);
	}

	if (loading || !customer) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
				<p className="text-sm text-gray-500">Loading your account...</p>
			</main>
		);
	}

	return (
		<main className="flex min-h-screen flex-col bg-gray-50 lg:flex-row">
			<Navbar />
			<section id="account" className="w-full px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
				<h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
					Welcome, {customer.fullname}!
				</h1>
				<p className="mt-5 text-xl font-medium text-black sm:text-2xl">
					What are you gonna shop todayyyy...
				</p>
				<p className="mt-4 text-sm text-gray-500">
					{customer.email}, {customer.phone}
				</p>
			</section>
		</main>
	);
}

export default Home;
