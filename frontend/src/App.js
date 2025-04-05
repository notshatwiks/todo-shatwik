import React, { useState, useEffect } from "react";

const backendUrl = "http://127.0.0.1:5000"; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  
  useEffect(() => {
    fetch(`${backendUrl}/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  
  const addTask = async () => {
    if (!newTask.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      const data = await response.json();
      setTasks([...tasks, data]);
      setNewTask(""); // Clear input
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
