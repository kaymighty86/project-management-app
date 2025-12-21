import Styles from './contextMenu.module.css';
import { useState, useRef, useEffect} from 'react';
// import { createPortal } from 'react-dom';
import {ContextMenuList} from './contextMenuList.jsx';
import { FaEllipsisVertical } from "react-icons/fa6";

// let val3 = 0;

/**
 * context menu component (or options menu)
 * @param {Array} options an array of options object. Object format {name: string, onClick: function}
 * @param {string} className add class name for any additional styles to the button
 */
const ContextMenu = ({options, className}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [UIPosition, setUIPosition] = useState({x: 0, y: 0})
    const contextMenuRef = useRef();
    const triggerButtonRef = useRef();
    // const menuRef = useRef();
    
    const classes = `${Styles.optionsButton} ${className != undefined? className : ""}`;

    useEffect(()=>{
        //reposition the menu after its visible
        if(menuVisible){
            const triggerBtnRect = triggerButtonRef.current.getBoundingClientRect();

            setUIPosition({
                x: triggerBtnRect.x < window.innerWidth / 2? triggerBtnRect.x : triggerBtnRect.x - (contextMenuRef.current.getBoundingClientRect().width - triggerBtnRect.width), //if the size of the box will not overflow the visble viewport of the page, use the boundingRect value, else position the menu at the left side
                y: triggerBtnRect.y < window.innerHeight / 2? triggerBtnRect.y : triggerBtnRect.y - (contextMenuRef.current.getBoundingClientRect().height)
            });
        }
    }, [menuVisible]);
    
    function handleMenuOpen(){
        if(!menuVisible){
            setMenuVisible(true);
        }
        else{
            setMenuVisible(false);
        }
    }

    return (
        <div className={Styles.contextMenuMainContainer}>
            <button ref={triggerButtonRef} className={classes} onClick={handleMenuOpen}><FaEllipsisVertical /></button>
            {
                menuVisible && <ContextMenuList ref={contextMenuRef} itemsList = {options} UIPosition = {UIPosition} closeMenu={()=>{setMenuVisible(false)}}/>
            }
        </div>
    );
}

export default ContextMenu;