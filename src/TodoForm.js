import React from 'react';
import './TodoForm.css';

function TodoForm({ addTodo, newTodo, handleInputChange }) {
    return (
        <div className="todo-form">
            <input
                type="text"
                className="todo-input"
                value={newTodo}
                onChange={handleInputChange}
                placeholder="Enter a new todo"
            />
            <button className="add-button" onClick={addTodo}>Add</button>
        </div>
    );
}

export default TodoForm;
