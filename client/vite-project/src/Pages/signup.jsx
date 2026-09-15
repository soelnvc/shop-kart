import React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

function Signup() {
    const navigate = useNavigate();
    const { setCustomer } = useAuth();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        phone: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            setLoading(true);

            const response = await api.post("/customers/register", formData);

            setCustomer(response.data.customer);
            navigate("/home");
        } catch (error) {
            setError(
            error.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-light text-gray-900 tracking-tight">
            Join Us
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Create an account to elevate your shopping experience.
          </p>
        </div>

        {error && (
            <p className="mb-4 text-center text-sm text-red-600">
                {error}
            </p>
        )}
        {/* Form Section */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullname"
              type="text"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="appearance-none block w-full px-0 py-2 border-0 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-black transition-colors bg-transparent sm:text-sm"
              placeholder="Jane Doe"  
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="appearance-none block w-full px-0 py-2 border-0 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-black transition-colors bg-transparent sm:text-sm"
              placeholder="jane@example.com"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="appearance-none block w-full px-0 py-2 border-0 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-black transition-colors bg-transparent sm:text-sm"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none block w-full px-0 py-2 border-0 border-b border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-black transition-colors bg-transparent sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-black hover:text-gray-700 transition-colors border-b border-transparent hover:border-gray-700 pb-0.5">
              Log in
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default Signup;