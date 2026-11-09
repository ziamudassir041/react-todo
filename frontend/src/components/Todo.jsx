
import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios';
const BASE_URL = "https://ziamudassir.com"
const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');
    async function getTodos() {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}/private-todo/get-todos`,
             {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

             );

            setTodos(response.data.allTodos);

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    useEffect(() => {
        getTodos();
    }, []);


     async function handleAdd(e) {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/private-todo/create-todo`,
                {
                    task: text,
                    done: false
                },
                 {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            setTodos((prev) => [...prev, response.data.newTodo]);
            setText("");

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

 async function toggleTodo(id, done) {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.patch(`${BASE_URL}/private-todo/update-todo/${id}`,
                {
                    done: !done
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("PATCH RESPONSE:", response.data);
             console.log("UPDATED TODO:", response.data.updatedTodo);
             
            setTodos((prev) =>prev.map((t) => t._id === id ? response.data.updatedTodo : t));

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

     async function deleteTodo(id) {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${BASE_URL}/private-todo/delete-todo/${id}`,
                 {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            setTodos((prev) =>
                prev.filter((t) => t._id !== id)
            );

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }


    return (
        <div className='p-5'>
            <form className='flex flex-col w-md' onSubmit={handleAdd}>
                <label htmlFor="todo">
                    Todo
                </label>
                <input value={text} className='border-2 rounded-md p-2 m-2' onChange={(e) => setText(e.target.value)} type="text" id="todo" placeholder='Enter your task' />
                <button className='border-2 bg-blue-600 text-white p-2 m-2 rounded-md w-1/2'>Add</button>
            </form>
            <ul className='mt-4'>
                {todos.map((t) => (
                    <li key={t._id} className='border-2 rounded-md p-3 m-2 w-md'>
                        <p className='font-semibold'>{t.title}</p>
                        <span>{t.done ? <p className='text-green-600'>Task completed</p> : <p className='text-gray-600'>Task incomplete</p>}</span>
                        <button className='bg-blue-600 text-white border-2 rounded-md p-2 m-2' onClick={() => toggleTodo(t._id,t.done)}>done</button>
                        <button className='bg-red-600 text-white border-2 rounded-md p-2 m-2' onClick={() => deleteTodo(t._id)}>delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
 
export default TodoApp
