const Todos = ({todos, addTodo}) => {
    console.log("Child render");
    return (
        <>
            <button onClick={addTodo}>Add Blog</button>
            {todos.map((todo, index) => {
                return (
                    <>
                        <hr style={{width: "80%"}}/>
                        <p key={index}>{todo}</p>
                        <br />
                    </>
                )
            })}        
        </>
    );
};

export default Todos;