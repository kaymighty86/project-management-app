import Styles from "./navigationSection.module.css";

import NavItem from './navItem.jsx';
import Button from "../UI/button.jsx";

const NavigationSection = ({visible, projectList, selectedProjectId, onProjectSelect, onNewProjectButtonClick, onProjectDelete, onNavMenuClose}) => {

    const projectSelectHandler = (projectId) => {
        handleCloseNavigation();//for small screen phones
        onProjectSelect(projectId);//call this function to notify the parent component that the user want to select this component
    }

    const newProjectButtonClickHandler = () => {
        handleCloseNavigation();//for small screen phones
        onNewProjectButtonClick();
    }

    function handleCloseNavigation(){
        const onSmallScreen = window.innerWidth <= 960? true : false;
        if(onSmallScreen){
            onNavMenuClose();
        }
    }

    return (
        <div className={`${Styles.navigationSection} ${!visible? Styles.navHidden : ""}`}>
            <button className={Styles.navCloseButton} onClick={handleCloseNavigation}><i className="fa-solid fa-x"></i></button>
            <div className={Styles.innerWrapper}>
                <h1 className={Styles.appTitle}>Projects Manager</h1>
                <Button className={Styles.newProjectButton} onClick={newProjectButtonClickHandler}><span className={Styles.gradientText}>+ Add Projects</span></Button>
                <>
                    {
                        projectList.map((project) => (
                                <NavItem key={project.projectId} name={project.projectName} isSelected={project.projectId === selectedProjectId} onClick={()=>projectSelectHandler(project.projectId)} onDelete={()=>{onProjectDelete(project.projectId)}}/>
                        ))
                    }
                </>
            </div>
        </div>
    );
}

export default NavigationSection;