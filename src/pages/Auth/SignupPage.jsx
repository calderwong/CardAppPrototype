import React from 'react';
import { Link } from 'react-router-dom'; // For linking to Login

function SignupPage() {
  // TODO: Implement form state handling and submission logic

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-neutral-light">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-primary-dark mb-6">Create Account</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-neutral-dark mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-neutral-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-neutral-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-dark mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-neutral-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Create a password"
            />
          </div>
           <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-dark mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full px-3 py-2 border border-neutral-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out mb-4"
          >
            Sign Up
          </button>
          <p className="text-center text-sm text-neutral-dark">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
