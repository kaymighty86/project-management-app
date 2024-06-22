import './App.css';
import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

import NavigationSection from './components/navigation/navigationSection.jsx';
import MainSection from './components/main/mainSection.jsx';
import mainSectionStates from './components/main/mainSectionStates.js';
import Button from './components/UI/button.jsx';

import defaultProjects from './data/defaultProjects.js';

function App() {
  const startingProjects = JSON.parse(localStorage.getItem('projects')) || defaultProjects;

  const [navShown, toggleNavMenu] = useState(false);//this is for when viewing the website in mobile phone
  const [projects, updateProjectList] = useState(startingProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(undefined);//no project should be selected by default
  
  const mainSectionRef = useRef();

  function toggleNavigation(){
    toggleNavMenu(prevState => (!prevState));
  }

  //----------------------------------------------------------
  function getProject(projectId){//returns the project object with the given id
    return projects.find( project => ( project.projectId === projectId ));
  }
  //----------------------------------------------------------

  //for showing project details UI (including the selected project data using its id)
  const showProject = (projectId) => {
    setSelectedProjectId(projectId);
    
    //when the 'selectedProjectId' state changes, the <mainSection /> will look like it did not update (by still showing old data) this is because of the state hook variable handled by the component and the <projectDetailsView /> component in it. Instead i'll use an established imperative handler to tell it to render itself
    mainSectionRef.current.changeUI(mainSectionStates.projectView, getProject(projectId));
  }

  //for showing the project creation UI
  const showProjectCreationUI = () => {
    mainSectionRef.current.changeUI(mainSectionStates.projectCreation);
    setSelectedProjectId(undefined);
  }

  //---------PROJECT CREATION, UPDATE AND DELETE--------------
  function saveToStorage(data){
    localStorage.setItem('projects', JSON.stringify(data))
  }

  const projectCreationHandler = (newProjectData) => {
    updateProjectList(prevProjects => {
      const updatedProjectsList = [...prevProjects, newProjectData];
      saveToStorage(updatedProjectsList);

      return updatedProjectsList;
    })
    showProject(newProjectData.projectId);//show the new project as the selected project
  }
  
  const projectDataUpdateHandler = (updatedProjectData) => {
    updateProjectList(projects => {
      const ArrayIndex = projects.findIndex(project => (project.projectId == updatedProjectData.projectId));

      if(ArrayIndex != undefined || ArrayIndex != null){
        projects[ArrayIndex] = updatedProjectData //replace the old data with the new one at that index. If not then just pass the old data
      }

      saveToStorage(projects);

      return projects;//returns the updated form of the projects array
    });
  }

  const projectDeleteHandler = (projectID) => {
    // console.log(projects.findIndex(project => (project.projectId == projectID)));
    updateProjectList(projects => {
      const updatedProjects = [...projects];
      const ArrayIndex = updatedProjects.findIndex(project => (project.projectId == projectID));
      
      if(ArrayIndex != undefined || ArrayIndex != null){
        updatedProjects.splice(ArrayIndex, 1);//delete the project data from the array
      }

      saveToStorage(updatedProjects);

      return updatedProjects;
    });

    //if the project to be deleted is the currently selected project, do the actions below
    if(projectID === selectedProjectId){
      mainSectionRef.current.changeUI(mainSectionStates.default);
      setSelectedProjectId(undefined);
    }
  }
  //---------------------------------------------------------------


  return (
    <>
      {/*through css, this header will only show when viewing from mobile phone*/}
      <header>
        <Button onClick={toggleNavigation}><i className="fa-solid fa-bars"></i></Button>
        <h1>PROJECT MANAGER APP</h1>
      </header>
      {createPortal(<NavigationSection visible={navShown} projectList={projects} selectedProjectId={selectedProjectId} onProjectSelect={showProject} onNewProjectButtonClick={showProjectCreationUI} onProjectDelete={projectDeleteHandler} onNavMenuClose={toggleNavigation}/>, document.getElementById('nav-root'))}
      <MainSection ref={mainSectionRef} UIState={mainSectionStates.default} selectedProject={getProject(selectedProjectId)} onProjectUpdated={projectDataUpdateHandler} onCreateNewProject={projectCreationHandler} onDeleteProject={projectDeleteHandler}/>
    </>
  )
}

export default App
