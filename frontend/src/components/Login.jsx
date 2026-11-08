import { Link,useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
const initialForm = {email: "",password: ""}

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState(initialForm);

    function handleChange(e) {
    const { name, value } = e.target;

        setForm((prev) => ({ ...prev,[name]: value }));
    }

   async function handleSubmit(e) {
    e.preventDefault();

    try {
        const response = await axios.post("http://localhost:5500/public-user/login",form);

        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token)

        navigate("/todo");

    } catch (error) {
        console.log("Full error:", error);
        console.log("Error message:", error.message);
        console.log("Backend response:", error.response?.data);
        console.log("Status:", error.response?.status);
    }
}
    return (
        <div>
            <form onSubmit={handleSubmit}className="flex flex-col w-md">
                <label htmlFor="email">Email:</label>
                <input name="email" id="email" type="email" placeholder="Enter your email" className="border-2 p-2 m-2" value={form.email}onChange={handleChange}/>

                <label htmlFor="password">Password:</label>
                <input name="password" id="password" type="password" placeholder="Enter your password" className="border-2 p-2 m-2" value={form.password} onChange={handleChange}/>

                <button type="submit" className="border-2 bg-blue-600 text-white p-2 m-2 rounded-md w-1/2">Login</button>
            </form>
        </div>
    );
};

export default Login;
