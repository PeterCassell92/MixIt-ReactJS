import {FaTimes} from "react-icons/fa";
import { selectedTheme as theme } from "../common/themes/theme"; 

function Task({task,  onDelete, onToggle}) {
    return (
        <article className ={ `task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)} >
            <h2>
                {task.text}
                <FaTimes style={{color: 'red', cursor: 'pointer'}}
                onClick={() => onDelete(task.id)}/>
            </h2>
            <h3>{task.day? task.day : 'No Description'}</h3>
        </article>
    )
}
export default Task;
