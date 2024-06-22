import Styles from './contextMenu.module.css';
import { useState, useRef} from 'react';
// import { createPortal } from 'react-dom';
import ContextMenuList from './contextMenuList.jsx';

// let val3 = 0;

/**
 * context menu component (or options menu)
 * @param {Array} options an array of options object. Object format {name: string, onClick: function}
 * @param {string} className add class name for any additional styles to the button
 */
const ContextMenu = ({options, className}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [UIPosition, setUIPosition] = useState({x: 0, y: 0})
    const triggerButtonRef = useRef();
    // const menuRef = useRef();
    
    const classes = `${Styles.optionsButton} ${className != undefined? className : ""}`;
    
    function handleMenuState(){
        //only do anything if menulist is not currently on
        if(!menuVisible){
            const triggerBtnRect = triggerButtonRef.current.getBoundingClientRect();
            setUIPosition({
                x: triggerBtnRect.x + 160 < document.body.scrollWidth? triggerBtnRect.x : triggerBtnRect.x - 150, //if the size of the box will not overflow the visble viewport of the page, use the boundingRect value, else position the menu at the left side
                y: triggerBtnRect.y
            });
    
            setMenuVisible(true);
        }
    }

    return (
        <div className={Styles.contextMenuMainContainer}>
            <button ref={triggerButtonRef} className={classes} onClick={handleMenuState}><i className="fa-solid fa-ellipsis-vertical"></i></button>
            {
                menuVisible && <ContextMenuList itemsList = {options} UIPosition = {UIPosition} onOOBClicked={()=>{setMenuVisible(false)}}/>
            }
        </div>
    );
}

export default ContextMenu;