import Styles from "./contextMenuList.module.css"

import { createPortal } from "react-dom";
import {useRef, useEffect} from 'react';

/**
 * 
 * @param {array} itemsList //array of contextMenu items and their callBack function
 * @param {object} UIPosition //top, left position where to place the list when its rendered
 * @param {function} onOOBClicked //function to call when the users clicks anywhere out of the bounry of the list (OOB means - out of bounds)
 */
export default function ContextMenuList({itemsList, UIPosition, onOOBClicked}){

    const listRef = useRef();

    useEffect(()=>{
        document.body.addEventListener('click', outOfBoundsClickHandler);
        // console.log("added OOB listener");

        function outOfBoundsClickHandler(event){
            //for some reason the click event is being invoked immediately as the menu is shown. it shouldn't be so but since the mouse will still be within the bounds of the menu when this happens, the menu is not disabled so its not breaking the app and its fine
            // console.log("checking if OOB clicked...");
            const menuBoundingBox = listRef.current.getBoundingClientRect();

            //check if the click position is within the bounding box of the context menu
            const isWithinBoundryX = (event.clientX >= menuBoundingBox.left) && (event.clientX <= menuBoundingBox.left + menuBoundingBox.width);
            const isWithinBoundryY = (event.clientY >= menuBoundingBox.top) && (event.clientY <= menuBoundingBox.top + menuBoundingBox.height);

            if(!(isWithinBoundryX && isWithinBoundryY)){//if its not within the boundry box invert the state of the menu
                // console.log("OOB clicked!");
                onOOBClicked();
            }
        }
    
        return ()=>{
            // console.log('removing oob detector!');
            document.body.removeEventListener('click', outOfBoundsClickHandler);
        }
    }, []);

    return (
        createPortal(
            <span ref={listRef} className={`${Styles.optionsList}`} style={{left: (UIPosition.x)+'px', top: (UIPosition.y)+'px'}}>
                <ul>
                    {itemsList != undefined && itemsList.map((item, id) => (
                         <li key={id} onClick={item.onClick}>{item.name}</li>
                        ))
                    }
                </ul>
            </span>
            , document.getElementById('context-menu-root')
        )
    )
}