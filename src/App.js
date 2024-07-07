import Login from './Login';
import Signup from './Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import NavigationBar from './Navbar';
import About from './About';
import Contact from './Contact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './TodoForm.css';
import './TodoList.css';


const API_BASE_URL = 'http://localhost:8000/api/todos/';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            fetchTodos(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchTodos = async (token) => {
        try {
            const response = await axios.get(API_BASE_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
            toast.error('Failed to fetch todos.');
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async () => {
        if (!isAuthenticated) {
            toast.error('Please log in to add a todo.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(API_BASE_URL, { text: newTodo, completed: false }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTodos([...todos, response.data]);
            setNewTodo('');
            toast.success("Task successfully added to Todo list!");
        } catch (error) {
            console.error('Error adding todo:', error);
            toast.error('Failed to add todo.');
        }
    };

    const deleteTodo = async (id) => {
        if (!isAuthenticated) {
            toast.error('Please log in to delete a todo.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_BASE_URL}${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTodos(todos.filter(todo => todo.id !== id));
            toast.success("Task successfully deleted!");
        } catch (error) {
            console.error('Error deleting todo:', error);
            toast.error('Failed to delete todo.');
        }
    };

    const toggleComplete = async (id) => {
        if (!isAuthenticated) {
            toast.error('Please log in to update a todo.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const todo = todos.find(todo => todo.id === id);
            const response = await axios.put(`${API_BASE_URL}${id}/`, { ...todo, completed: !todo.completed }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
            toast.success(`Task marked as ${todo.completed ? "incomplete" : "complete"}!`);
        } catch (error) {
            console.error('Error updating todo:', error);
            toast.error('Failed to update todo.');
        }
    };

    const handleInputChange = (event) => {
        setNewTodo(event.target.value);
    };

    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:8000/api/token/', credentials);
            localStorage.setItem('token', response.data.access);
            setIsAuthenticated(true);
            toast.success("Login successful!");
            fetchTodos(response.data.access); // Fetch todos after successful login
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Failed to login.');
        }
    };

    const handleSignup = async (userData) => {
        try {
            await axios.post('http://localhost:8000/api/register/', userData);
            toast.success("Signup successful! Please login.");
        } catch (error) {
            console.error('Error during signup:', error);
            toast.error('Failed to signup.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setTodos([]); // Clear todos after logout
        toast.success("Logout successful!");
    };

    return (
        <Router>
            <div className="App">
                <NavigationBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                <div className="content">
                    <Routes>
                        <Route path="/" element={
                            isAuthenticated ? (
                                <div>
                                    <h1>Todo List</h1>
                                    <TodoForm addTodo={addTodo} newTodo={newTodo} handleInputChange={handleInputChange} />
                                    <TodoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
                                </div>
                            ) : (
                                <h1>Please log in to view your todos.</h1>
                            )
                        } />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
                    </Routes>
                </div>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
