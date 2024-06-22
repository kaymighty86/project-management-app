import Styles from './newProjectUI.module.css';

import Input from '../../UI/input.jsx';
import Button from '../../UI/button.jsx';
import TextArea from '../../UI/textArea.jsx';

import { useRef } from 'react';
import { convertDateToString } from '../../../utils/utils.js';

const NewProjectUI = ({onSubmit, onCancel}) => {
    const nameInputRef = useRef();
    const descriptionInputRef = useRef();
    const dateInputRef = useRef();

    const projectCreationHandler = (event) => {
        event.preventDefault();

        const projectBasicData = {
            projectId: 'project'+Math.random(),
            projectName: nameInputRef.current.value,
            description: descriptionInputRef.current.value,
            dueDate: new Date(dateInputRef.current.value)
        }

        console.log(projectBasicData);

        onSubmit(projectBasicData);//call this function to pass the parameters up
    }

    
    const cancelHandler = () => {
        onCancel();
    }
    
    return (
        <div className={Styles.mainWrapper}>
            <div className={Styles.window}>
                <form onSubmit={projectCreationHandler} onReset={cancelHandler}>
                    <div className={Styles.actionButtonsConatainer}>
                        <Button colorType="3" type="reset">Cancel</Button>
                        <Button colorType="1" type="submit">Save</Button>
                    </div>
                    <div className={`${Styles.inputContainer} ${Styles.required}`}>
                        <label htmlFor="project-name-input">Project Name</label>
                        <Input ref={nameInputRef} id="project-name-input" type="text" name="projectName" placeholder="Type here" required/>
                    </div>
                    <div className={Styles.inputContainer}>
                        <label htmlFor="description-input">Description</label>
                        <TextArea ref={descriptionInputRef} id="description-input" name="description" placeholder="Type here" maxLength={250}></TextArea>
                    </div>
                    <div className={`${Styles.inputContainer} ${Styles.required}`}>
                        <label htmlFor="date-input">Due Date</label>
                        <Input ref={dateInputRef} id="date-input" type="date" name="dueDate" min={convertDateToString(new Date())} required/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewProjectUI;