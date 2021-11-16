import {useState} from 'react';
import Swal from 'sweetalert2';
import SwalConfig from '../../common/lib_extensions/swal_config';
import { Input, InputGroup } from '../Inputs/Inputs';
import Button from '../Button/Button'
import './addTask.css';

function AddTask({onAdd}) {
    const [name, setName ] = useState('');
    const [nameAttempted, setNameAttempted] = useState(false);
    const [nameValidated, setNameValidated] = useState(false);
    const validateTaskName = (val) => val.length > 3;
    const handleNameOnChange = (e)=> {
        setName(e.target.value);
        if(!nameAttempted){setNameAttempted(true)};
        setNameValidated(validateTaskName(e.target.value));
    }

    const [description, setDescription] = useState('');
    const [descriptionAttempted, setDescriptionAttempted] = useState(false);
    const [descriptionValidated, setDescriptionValidated] = useState(false);
    const validateDescription = (val) => val.length > 3;
    const handleDescriptionOnChange = (e)=> {
        setDescription(e.target.value);
        if(!descriptionAttempted){setDescriptionAttempted(true)};
        setDescriptionValidated(validateDescription(e.target.value));
    }

    const [flag, setFlag] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if(!name || name == ''){
            //TODO sweet alert this.
            Swal.fire(new SwalConfig({error:true, text: "Name is Required"}));
            return;
        }
        onAdd({name,description,flag});
        setName('');
        setDescription('');
        setFlag(false);
    } 

    return (
        <form className= 'add-form' onSubmit={onSubmit}>
                <h4>New Task</h4>
                <InputGroup>
                    <Input
                        id='taskname'
                        label = 'Task Name'
                        placeholder='Add Step'
                        type='text'
                        value= {name}
                        onChange={handleNameOnChange}
                        attempted={nameAttempted}
                        valid={nameValidated}
                        bgalt={true}
                        />
                    <Input
                        id='description'
                        label = 'Description'
                        placeholder='Details'
                        type='textarea'
                        value= {description}
                        onChange={handleDescriptionOnChange}
                        attempted={descriptionAttempted}
                        valid={descriptionValidated}
                        bgalt={true}
                    />
                </InputGroup>
            {/* <div className='form-control form-control-check'>
                <label>Mark</label>
                <input type='checkbox' checked={flag} value={flag}
                onChange={(e) =>setFlag(e.currentTarget.checked)}/>
            </div> */}
            <Button type='submit' text='Save'/>
        </form >
    )
}
export default AddTask;
