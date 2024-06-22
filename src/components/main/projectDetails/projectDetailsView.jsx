import { useState, forwardRef, useImperativeHandle } from "react";
import Styles from "./projectDetailsView.module.css";
import TasksManager from "./tasksManager.jsx";
import ContextMenu from "../../contextMenu/contextMenu.jsx";

const ProjectDetailsView = forwardRef(function ProjectDetailsView({project, onProjectUpdated, onDelete}, ref){

    const [currentProject, setCurrentProject] = useState(project);

    useImperativeHandle(ref,()=>{
        return {
            viewProject(currentProject){//when called, replace the current state variable (assigned project) with the current project. Which will make the component render again and display the current project
                setCurrentProject(currentProject);
            }
        }
    });

    //extract the date components to enable us display it however we want
    const month = new Date(currentProject.dueDate).toLocaleString("en-US", { month: "short" });//this function return the date based on the langage and format of the date. In this case it will return the full name of the month
    const day = new Date(currentProject.dueDate).toLocaleString("en-US", { day: "2-digit" });///Same as above. In this case it will return the day of the month (number).
    const year = new Date(currentProject.dueDate).getFullYear();

    const tasksUpdateHandler = (updatedTasks)=> {
        //TASKS UPDATED FOR THE CURRENT PROJECT.
        setCurrentProject(prevProjectData => {
            const updatedProjectData = {...prevProjectData, tasks: updatedTasks};
            onProjectUpdated(updatedProjectData);//call this function and pass the updated project object

            return updatedProjectData
        });
        // currentProject.tasks = updatedTasks;
    }

    const deletProject = () => {
        onDelete(project.projectId);
    }

    //----------------------------------------
    //for the context menu
    const contextMenuItems = [
        {
            name: "Delete",
            onClick: () => {
                deletProject();
            }
        }
    ]
    //----------------------------------------

    return(
        <div className={Styles.mainWrapper}>
            <div className={Styles.projectDetailsSection}>
                <h1 className={Styles.projectName}>{currentProject.projectName}</h1>
                <p className={Styles.dueDate}>{`Due: ${month} ${day}, ${year}`}</p>
                <p className={Styles.projectDescription}>{currentProject.description}</p>
                <div className={Styles.optionsButtonWrapper}>
                    <ContextMenu options={contextMenuItems} />
                </div>
            </div>
            <TasksManager tasks={currentProject.tasks} onTasksUpdated={tasksUpdateHandler}/>
        </div>
    )
});

export default ProjectDetailsView;