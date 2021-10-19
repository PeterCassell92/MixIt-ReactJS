import { api_selection, verj, jsonserver } from "./constants"

const json_server_base_url = 'http://localhost:5000'

const json_server_api = {
    tasks:{
        getAllTasks:  async () => {
            const res = await fetch(`${json_server_base_url}/tasks`)
            const data = await res.json()
            return data
        },
        getTask: async (id) => {
            const res = await fetch(`${json_server_base_url}/tasks/${id}`)
            const data = await res.json()
            return data
        },
        deleteTask: async (id) => {
            await fetch(`${json_server_base_url}/tasks/${id}`,{method: 'DELETE'})
        },
        addTask: async (task) =>{
            const res = await fetch(`${json_server_base_url}/tasks`,
            {
                method:'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })      
            const data = await res.json()
            return data
        },
        toggleReminder: async (id) => {
            const taskToToggle = await fetchTask(id)
            const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
            const res = await fetch(`${json_server_base_url}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify(updTask)
            })
            const data = await res.json()
            return data
        }
    }
}

const verj_base_url = 'http://localhost:5000'
const verj_api = {
    tasks:{
        getAllTasks:  async () => {
            const res = await fetch(`${verj_base_url}/tasks`)
            const data = await res.json()
            return data
        },
        getTask: async (id) => {
            const res = await fetch(`${verj_base_url}/tasks/${id}`)
            const data = await res.json()
            return data
        },
        deleteTask: async (id) => {
            await fetch(`${verj_base_url}/tasks/${id}`,{method: 'DELETE'})
        },
        addTask: async (task) =>{
            const res = await fetch(`${verj_base_url}/tasks`,
            {
                method:'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })      
            const data = await res.json()
            return data
        },
        toggleReminder: async (id) => {
            const taskToToggle = await fetchTask(id)
            const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
            const res = await fetch(`${verj_base_url}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify(updTask)
            })
            const data = await res.json()
            return data
        }
    }
}

const selected_api = (api_selection == verj ? verj_api : (api_selection == jsonserver? json_server_api: {}))

export {selected_api}
export default selected_api