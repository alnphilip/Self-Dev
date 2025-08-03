import React, { useState, useEffect } from "react";
import supabase from "./helper/supabaseClient";
import "./App.css";

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
    <div className="todo-container">
      <h1 className="todo-header">Todo App</h1>

      <div className="todo-input-container">
        <input
          className="todo-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new todo"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button className="btn btn-add" onClick={addTodo}>Add Task</button>
      </div>

      <div className="todo-section">
        <h2>Active Tasks</h2>
        {todos.filter(t => !t.completed).map(todo => (
          <div key={todo.id} className="todo-item">
            <span className="todo-title">{todo.title}</span>
            <div className="todo-actions">
              <button className="btn btn-complete" onClick={() => completeTodo(todo.id)}>Complete</button>
              <button className="btn btn-edit" onClick={() => updateTodo(todo.id, prompt("Update task:", todo.title))}>
                Edit
              </button>
              <button className="btn btn-delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="todo-section">
        <h2>Completed Tasks</h2>
        {todos.filter(t => t.completed).map(todo => (
          <div key={todo.id} className="todo-item">
            <span className="todo-title todo-completed">{todo.title}</span>
            <div className="todo-actions">
              <button className="btn btn-delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;