import Styles from "./tasksManager.module.css";
import Input from "../../UI/input.jsx";
import Button from "../../UI/button.jsx";

import { useRef } from "react";

const TasksManager = ({tasks, onTasksUpdated}) => {

    if(tasks == undefined){//if no task array was passed (this can happen if user is creating a new project)
        tasks = [];//initialise task as a new array
    }

    const inputRef = useRef();

    //For adding new task
    const handleTaskAddition = () => {
        if(inputRef.current.value != ""){
            tasks.push(inputRef.current.value);
            inputRef.current.value = "";//clear the value of the input element

            onTasksUpdated(tasks);//call this function to alert any component that needs to know
        }
    }

    //For deleting task
    const handleTaskDeletion = (taskIndex) => {
        tasks.splice(taskIndex, 1);//delect the task from the task index provided
        onTasksUpdated(tasks);//call this function and pass the upated tasks array
    }

    return (
        <div className={Styles.taskManagerMainWrapper}>
            <h2>Tasks</h2>
            <div className={Styles.taskInputContainer}>
                <Input ref={inputRef} type="text" className={Styles.taskInput} placeholder='Type task here..'/>
                <Button colorType="1" onClick={handleTaskAddition}>Add Task</Button>
            </div>
            <div className={Styles.tasksList}>{/*tasks go inside here */}
                { tasks.length > 0 ? 
                    tasks.map((task, id) => (
                        <div key={id} className={Styles.taskItem}>
                            <p>{task}</p>
                            <Button colorType='3' onClick={()=>{handleTaskDeletion(id)}}>Clear</Button>
                        </div>
                    )) : 
                    <p>No tasks added yet.</p>
                }
            </div>
        </div>
    );
}

export default TasksManager;