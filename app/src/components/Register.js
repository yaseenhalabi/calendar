import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate()
    const [registerInfo, setRegisterInfo] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
    });
    const [error, setError] = useState()
    const handleInputChange = (e) => {
        setRegisterInfo({
            ...registerInfo,
            [e.target.name]: e.target.value,
        });
    };

    const api_uri = "http://127.0.0.1:5000"
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const data = await axios.post(api_uri+"/register", registerInfo, {withCredentials: true})
            console.log(data)
            navigate('/')
        }
        catch(e){
            setError("ERROR 500: SERVER RELATED ISSUE")
        }
    }
    console.log(registerInfo);
    

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register for an account
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
            <div>
                <label htmlFor="firstName" className="sr-only">
                First Name
                </label>
                <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={registerInfo.firstName}
                onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="lastName" className="sr-only">
                Last Name
                </label>
                <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                value={registerInfo.lastName}
                onChange={handleInputChange}
                />
            </div>
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
                value={registerInfo.username}
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
                value={registerInfo.password}
                onChange={handleInputChange}
                />
            </div>
            </div>

            <div>
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Register
            </button>
            </div>
        </form>
        <div className="text-center mt-2">
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Already have an account? Sign In
            </a>
        </div>
        </div>
    </div>
    );
};

export default Register;
