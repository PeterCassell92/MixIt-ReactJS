import {FaTimes} from 'react-icons/fa'

function Task({task,  onDelete, onToggle}) {
    return (
        <div className ={ `task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)} >
            <h3>
                {task.text}
                <FaTimes style={{color: 'red', cursor: 'pointer'}}
                onClick={() => onDelete(task.id)}/>
            </h3>
            <h5>{task.day? task.day : 'No scheduled time'}</h5>
        </div>
    )
}
export default Task;
