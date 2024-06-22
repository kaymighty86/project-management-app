import Styles from "./mainSection.module.css";
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';

import mainSectionStates from './mainSectionStates.js';
import appIcon from "../../assets/app-icon.png";

import Button from "../UI/button.jsx";
import ProjectDetailsView from "./projectDetails/projectDetailsView.jsx";
import NewProjectUI from "./newProject/newProjectUI.jsx";

const MainSection = forwardRef(({UIState, selectedProject, onProjectUpdated, onCreateNewProject, onDeleteProject}, ref)=>{

    const [currentUIState, setUIState] = useState(UIState);

    const projectDetailsViewerRef = useRef();

    useImperativeHandle(ref, ()=> {
        return {
            /**
             * The changeUI() function tells this component to switch the rendered component to what is stated.
             * @param {string} UIState //UIState parameter tells it what UI to render. Use the predefined states from the 'mainSectionStates.js' script
             * @param {object} otherData //otherData can contain any extra data needed. For example, when the component is to render the <projectDetailsViewer /> it is expected to also pass the project to view as the second parameter
             */
            changeUI(UIState, otherData){
                setUIState(UIState);

                //if we are to show the <projectDetailsViewer /> component, then the project data should have also been passed, so tell the <projectDetailsViewer /> component to view the data
                if(UIState == mainSectionStates.projectView && projectDetailsViewerRef.current != undefined){//make sure 'projectDetailsViewerRef.current' has been initialised
                    projectDetailsViewerRef.current.viewProject(otherData);
                }
            },
            getCurrentUIState(){
                return currentUIState;
            }
        }
    });

    const projectUpdateHandler = (udatedProject) => {//this function is triggered when the <ProjectDetailsView /> component notices a change in the project data
        onProjectUpdated(udatedProject);//call this component to let the App component know
    }

    const projectCreationRequesthandler = (newProjectData) => {
        onCreateNewProject(newProjectData);
    }

    const projectDeleteHandler = (projectId) => {
        onDeleteProject(projectId);
    }

    //-----------------------------------------------------
    const defaultUI = (
        <div className={Styles.defaultUIContainer}>
            <div className={Styles.defaultUIWindow}>
                <img src={appIcon} className={Styles.appIcon} alt="app icon" width='128px' height='128px' />
                <h1>No Project Selected</h1>
                <p>Select a project or get started with a new one</p>
                <Button colorType={1} className={Styles.createProjectBtn} onClick={()=>{ref.current.changeUI(mainSectionStates.projectCreation)}}>Create new project</Button>
            </div>
        </div>
    );
    //-----------------------------------------------------

    let currentUI = defaultUI;
    switch(currentUIState){
        case mainSectionStates.default: 
            currentUI = defaultUI;
        break;
        case mainSectionStates.projectCreation: 
            currentUI = <NewProjectUI onSubmit={projectCreationRequesthandler} onCancel={()=>ref.current.changeUI(mainSectionStates.default)}/>;
        break;
        case mainSectionStates.projectView: 
            currentUI = <ProjectDetailsView ref={projectDetailsViewerRef} project={selectedProject} onProjectUpdated={projectUpdateHandler} onDelete={projectDeleteHandler}/>;
        break;
    }

    return(
        <div className={Styles.mainSection}>
            {currentUI}
        </div>
    )
})

export default MainSection;