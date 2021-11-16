import { useEffect,useState } from "react"

//components
import AddTask from "./AddTask/AddTask"
import Tasks from "./Tasks"
import SectionHeader from "./SectionHeader"
import {selected_api as api} from "../common/api"
import Swal from "sweetalert2"
import SwalConfig from "../common/lib_extensions/swal_config"
import { selectedTheme as theme } from "../common/themes/theme"
import { Button } from "bootstrap"

function TaskList() {
    const [tasks, setTasks]= useState([])
    const [showAddTask, setShowAddTask] = useState(false)

    const addTask = async (task) => {
        const taskformatted= {
            text:task.name,
            day: task.description,
            reminder: task.flag
        }
        const data = await api.tasks.addTask(taskformatted).then((newTask) =>{
            setTasks([...tasks, newTask])
            Swal.fire(new SwalConfig({success:true, text: "Step Added"}))
        })
        .catch((err) => {
            Swal.fire(new SwalConfig({error:true, text: "Unable to Add Step"}))
        }) 
    }

    const deleteTask = async (id) => {
        const data = await api.tasks.deleteTask(id).then(() =>{
            setTasks(tasks.filter((task) => task.id !==id))
            Swal.fire(new SwalConfig({success:true, text: "Step Deleted"}))
        })
        .catch((err) => {
            Swal.fire(new SwalConfig({error:true, text: "Unable to Delete Step"}))
        })
    }

    const toggleReminder = async (id) => {
        const data = api.tasks.toggleReminder(id).then((updatedTask) =>{
                setTasks(tasks.map((task) => task.id === id ? {...task, reminder: updatedTask.reminder} : task))
                // Swal.fire(new SwalConfig({success:true, text: "Task Reminder Toggled"}))  
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
                Swal.fire(new SwalConfig({error:true, text: "Unable to Retrieve Steps"}))
            })      
        }        
        getTasks()
    }, [])

    return (
        <>
            <SectionHeader
                title="Process"
                // buttonOnClick={() => setShowAddTask(!showAddTask)}
                // showButton={true}
                // buttonColor={showAddTask? theme.container.color.textheader: theme.main.color.info}
                // buttonText={showAddTask? 'Close':'Add'}
                />
                        
            {tasks.length > 0 ? (
                <Tasks tasks={tasks}
                    onDelete={deleteTask} onToggle={toggleReminder}/>
                ) :
                'No Process Steps to Display' }
            {showAddTask?
                <Button onClick={setShowAddTask(!showAddTask)}>
                Add New Step
                </Button> : <AddTask onAdd={addTask}/> } 
            {}
        </>
    )
}
export default TaskList;
