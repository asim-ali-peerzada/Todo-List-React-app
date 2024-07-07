// TodoItem.js
import React from 'react';
import axios from 'axios';
import './TodoList.css';

const TodoItem = ({ todo, onDelete }) => {
    const handleComplete = async () => {
        try {
            const updatedTodo = { ...todo, completed: !todo.completed };
            await axios.put(`http://localhost:8000/api/todos/${todo.id}/`, updatedTodo);
            // Optionally, update UI state to reflect completion
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/todos/${todo.id}/`);
            onDelete(todo.id); // Update UI state to remove deleted todo
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span>{todo.text}</span>
            <div>
                <button className="complete-button" onClick={handleComplete}>
                    {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button className="delete-button" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
