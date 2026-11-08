import { Link } from 'react-router';
import React from 'react';

const Welcome = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">

            <h1 className="text-3xl font-bold mb-3">
                Welcome to Todo App
            </h1>

            <p className="text-gray-600 mb-6">
                Manage your daily tasks easily.
            </p>

            <div className="flex flex-col items-center gap-4">

            

               <Link to="/login">
    <button className="border-2 bg-blue-600 text-white p-2 rounded-md w-32">Login</button>
           </Link>

                <p>Don't have an account?</p>

               <Link to="/signup">
    <button className="border-2 bg-blue-600 text-white p-2 rounded-md w-32">Sign Up</button>
</Link>

            </div>
        </div>
    );
};

export default Welcome;
