// Blogs.js
import React, { useState, useCallback } from 'react';
import Todos from './Blogs_components/Todos.js';
import styles from '../styles/Blogs.module.css';

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
        <div className="startPage">
            <h1>Blog Articles</h1>
            <div className={styles.blogsContainer}>
                <textarea className={styles.blogArea} value={textarea} onChange={handleChange} />
                <Todos todos={todos} addTodo={addTodo} />
                <hr className={styles.hrObject} />
                <p>You can write something here!</p>
                <hr className={styles.hrObject} />
            </div>
        </div>
    );
};
  
export default Blogs;