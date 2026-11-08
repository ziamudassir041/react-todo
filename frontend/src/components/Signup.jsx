import { Link,useNavigate } from 'react-router';
import { useState } from 'react';
import axios from "axios"

const initialForm = {name: "",email: "",password: ""};

const SignUp = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState(initialForm);
     function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({...prev,[name]: value}));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5500/public-user/register",
                form
            );

            console.log(response.data);
            
            console.log("Registered:", response.data);

            setForm(initialForm);
            navigate ("/login")

        } catch (error) {
             console.log("Error:", error.response?.data);
    console.log("Status:", error.response?.status);
        
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col w-md">
            <label htmlFor="name">Name:</label>
                <input name="name" type="text" id="name"placeholder="Enter your name" className="border-2 p-2 m-2" value={form.name}onChange={handleChange}/>

                <label htmlFor="email">Email:</label>
                <input name="email" type="email" id="email" placeholder="Enter your email" className="border-2 p-2 m-2" value={form.email} onChange={handleChange}/>

                <label htmlFor="password">Password:</label>
                <input name="password" type="password" id="password" placeholder="Enter your password" className="border-2 p-2 m-2" value={form.password} onChange={handleChange}/>

                <button type="submit"  className="border-2 bg-blue-600 text-white p-2 m-2 rounded-md w-1/2">Sign Up</button>

            </form>
        </div>
    );
};

export default SignUp;
