import Styles from './textArea.module.css';
import {forwardRef} from 'react';

const TextArea = forwardRef(function TextArea(Props, ref){
    const classes = `${Styles.textAreaStyle} ${Props.className != undefined? Props.className : ""}`;

    return <textarea ref={ref} {...Props} className={classes}>{Props.children}</textarea>
})

export default TextArea;