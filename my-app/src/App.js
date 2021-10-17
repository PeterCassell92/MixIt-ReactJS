import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react"


//components
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const title = "Task Tracker"
  const [showAddTask, setShowAddTask] = useState(false)

  const addTask = async (task) => { 
    const res = await fetch('http://localhost:5000/tasks',
    {
      method:'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    
    const data = await res.json()
    setTasks([...tasks, data])
    // const id = Math.floor((Math.random() * 10000) + 1)
    // const newTask = {id , ...task}

    //setTasks(tasks.push(task)) not mutable can't do this.
    //don't modify the current state only copy it.
    
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }

  const [tasks, setTasks]= useState([])

  useEffect(()=> {
      const getTasks = async() => {
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
      }
    
    getTasks()
  }, [])

  //Fetch tasks
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }
  
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{method: 'DELETE'})

    setTasks(tasks.filter((task) => task.id !==id))
  }

  return (
    <div className="container">
      <Header title={title} onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks to Display' }
    </div>
  );
}

export default App;
