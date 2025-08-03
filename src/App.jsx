import React, { useState, useEffect } from "react";
import supabase from "./helper/supabaseClient";

function App() {
  useEffect(() => { fetchTodo() }, [])
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("")

  async function addTodo() {
    if (!title.trim()) return;

    const { error } = await supabase.from("TO-DO").insert([{ title }])
    if (error) { console.error(error) }
    else {
      setTitle("");
      fetchTodo();
    }


  }

  async function fetchTodo() {
    const { data, error } = await supabase.from("TO-DO").select("*").order("created_at", { ascending: true });

    if (error) { console.error(error) }
    else {
      setTodos(data);
    }
  }
  async function completeTodo(id) {
    await supabase.from("TO-DO").update({ completed: true }).eq("id", id);
    fetchTodo();
  }
  async function deleteTodo(id) {
    await supabase.from("TO-DO").delete().eq("id", id);
    fetchTodo();
  }

  async function updateTodo(id, newTitle) {
    await supabase.from("TO-DO").update({ title: newTitle }).eq("id", id);
    fetchTodo();
  }



return (
    <div>
      <h1>Todo App</h1>

      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div>
        <h2>Active Tasks</h2>
        {todos.filter(t => !t.completed).map(todo => (
          <div key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => completeTodo(todo.id)}>Complete</button>
            <button onClick={() => updateTodo(todo.id, prompt("Update task:", todo.title))}>
              Edit
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Completed Tasks</h2>
        {todos.filter(t => t.completed).map(todo => (
          <div key={todo.id}>
            <span style={{ textDecoration: 'line-through' }}>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;