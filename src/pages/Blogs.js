// Blogs.js
import React, { useState, useCallback } from 'react';
import Todos from './Blogs_components/Todos.js';

const Blogs = () => {
    const [textarea, setTextarea] = useState(
        "The content of a textarea goes in the value attribute"
    );
    const [todos, setTodos] = useState([])

    const handleChange = (event) => {
        setTextarea(event.target.value)
    }

    const addTodo = useCallback(() => {
        setTodos((t) => [...t, textarea]);
    }, [textarea]);

    return (
        <div class="startPage">
            <h1>Blog Articles</h1>
            <div>
                <textarea style={{width: "99.5%"}} value={textarea} onChange={handleChange} />
                <br />
                <Todos todos={todos} addTodo={addTodo} />
                <hr />
                <p>You can write something here!</p>
                <hr />
            </div>
        </div>
    );
};
  
export default Blogs;