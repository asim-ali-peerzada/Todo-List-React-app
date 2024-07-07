import React from 'react';
import './TodoList.css';

function TodoList({ todos, deleteTodo, toggleComplete }) {
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                    {todo.text}
                    <button className="complete-button" onClick={() => toggleComplete(todo.id)}>
                        {todo.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default TodoList;
