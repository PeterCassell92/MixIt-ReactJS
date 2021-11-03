import { useEffect,useState } from "react"

//components
import AddTask from "./AddTask"
import Tasks from "./Tasks"
import SectionHeader from "./SectionHeader"
import {selected_api as api} from "../common/api"
import Swal from "sweetalert2"
import SwalConfig from "../common/lib_extensions/swal_config"
import { selectedTheme as theme } from "../common/themes/theme"

function TaskList() {
    const [tasks, setTasks]= useState([])
    const [showAddTask, setShowAddTask] = useState(false)

    const addTask = async (task) => {
        const data = await api.tasks.addTask(task).then((newTask) =>{
            setTasks([...tasks, newTask])
            Swal.fire(new SwalConfig({success:true, text: "Task Added"}))
        })
        .catch((err) => {
            Swal.fire(new SwalConfig({error:true, text: "Unable to Add Task"}))
        }) 
    }

    const deleteTask = async (id) => {
        const data = await api.tasks.deleteTask(id).then(() =>{
            setTasks(tasks.filter((task) => task.id !==id))
            Swal.fire(new SwalConfig({success:true, text: "Task Deleted"}))
        })
        .catch((err) => {
            Swal.fire(new SwalConfig({error:true, text: "Unable to Delete Task"}))
        })
    }

    const toggleReminder = async (id) => {
        const data = api.tasks.toggleReminder(id).then((updatedTask) =>{
                setTasks(tasks.map((task) => task.id === id ? {...task, reminder: updatedTask.reminder} : task))
                Swal.fire(new SwalConfig({success:true, text: "Task Reminder Toggled"}))  
            })
            .catch((err) => {
                Swal.fire(new SwalConfig({error:true, text: "Unable to Toggle Reminder"}))
            })
    }

    useEffect(()=> {
        const getTasks = async() => {
            const data = api.tasks.getAllTasks().then((tasks) => {
                const sortedTasks = tasks.sort((t1,t2) => t1.id-t2.id)
                setTasks(sortedTasks)
            })
            .catch((err)=>{
                Swal.fire(new SwalConfig({error:true, text: "Unable to Retrieve Tasks"}))
            })      
        }        
        getTasks()
    }, [])

    return (
        <>
            <SectionHeader
                title="Process Builder"
                buttonOnClick={() => setShowAddTask(!showAddTask)}
                showButton={true}
                buttonColor={showAddTask? theme.main.color.textbody: theme.main.color.info}
                buttonText={showAddTask? 'Close':'Add'}/>
                        
            {showAddTask && <AddTask onAdd={addTask}/>}
            {tasks.length > 0 ? (
                <Tasks tasks={tasks}
                    onDelete={deleteTask} onToggle={toggleReminder}/>
                ) :
                'No Steps to Display' }
        </>
    )
}
export default TaskList;
