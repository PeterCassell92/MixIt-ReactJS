import { useEffect,useState } from "react"

//components
import AddTask from "../../components/AddTask"
import Tasks from "../../components/Tasks"
import Header from "../../components/Header"

function TaskList() {    
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
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })
        const data = await res.json()
        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
    }
        
    //Fetch tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        return data
    }

    //Fetch task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        return data
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`,{method: 'DELETE'})
        setTasks(tasks.filter((task) => task.id !==id))
    }

    useEffect(()=> {
        const getTasks = async() => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        
        getTasks()
    }, [])

    const [tasks, setTasks]= useState([])
    const [showAddTask, setShowAddTask] = useState(false)
    
    return (
        <>
            <Header buttonOnClick={() => setShowAddTask(!showAddTask)}
					showButton={true}
                    buttonColor={showAddTask? 'red': 'green'}
                    buttonText={showAddTask? 'Close':'Add'}/>
                    
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? (
                <Tasks tasks={tasks}
                    onDelete={deleteTask} onToggle={toggleReminder}/>
                ) :
                'No Tasks to Display' }
        </>
    )
}

export default TaskList
