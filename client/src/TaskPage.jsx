import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [desc, setDesc] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks').then(res => setTasks(res.data));
  }, []);

  const addTask = async () => {
    const { data } = await axios.post('http://localhost:5000/tasks', { description: desc });
    setTasks([...tasks, data]);
    setDesc('');
  };

  const completeTask = async (id) => {
    await axios.patch(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: true } : t));
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>Tasks</h2>
      <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.description} - {t.completed ? '✅' : '❌'}
            {!t.completed && <button onClick={() => completeTask(t.id)}>Complete</button>}
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPage;
