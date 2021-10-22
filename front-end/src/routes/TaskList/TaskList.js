import { useEffect,useState } from "react"

//components
import AddTask from "../../components/AddTask"
import Tasks from "../../components/Tasks"
import Header from "../../components/Header"
import {selected_api as api} from "../../common/api"

function TaskList() {
    const [tasks, setTasks]= useState([])
    const [showAddTask, setShowAddTask] = useState(false)

    const addTask = async (task) => {
        const data = await api.tasks.addTask(task)
        setTasks([...tasks, data])
    }

    const deleteTask = async (id) =>{
        const data = await api.tasks.deleteTask(id)
        await 
        setTasks(tasks.filter((task) => task.id !==id))
    }

    const toggleReminder = async (id) => {
        const data = await api.tasks.toggleReminder(id)
        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
    }

    useEffect(()=> {
        const getTasks = async() => {
            const tasksFromServer = await api.tasks.getAllTasks()
            setTasks(tasksFromServer)
        }        
        getTasks()
    }, [])

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
