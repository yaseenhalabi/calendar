import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = () => {
    const navigate = useNavigate()
    const api_uri = "http://127.0.0.1:5000"
    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setLoginInfo({
                ...loginInfo,
                [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const data = await axios.post(api_uri+"/login", loginInfo, {withCredentials: true})
            console.log(data)
            navigate('/')
        }
        catch(e){
            console.log(e)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="username" className="sr-only">
                    Username
                    </label>
                    <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    value={loginInfo.username}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                    Password
                    </label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={loginInfo.password}
                    onChange={handleInputChange}
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign In
                </button>
                </div>
            </form>
            <div className="text-center mt-2">
                <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Don't have an account? Register
                </a>
            </div>
            </div>
        </div>
    );
};

export default Login;
