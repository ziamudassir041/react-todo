import { Routes, Route } from "react-router";

import Welcome from "./pages/Welcomepage.jsx"
import Login from "./pages/Loginpage.jsx"
import SignUp from "./pages/Resgister.jsx"
import TodoApp from "./pages/Todopage.jsx"
import NotFound from "./pages/Notfound.jsx"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/todo" element={<TodoApp />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;