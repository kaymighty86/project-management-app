import Styles from './navItem.module.css';

import ContextMenu from "../contextMenu/contextMenu.jsx";
import { PiProjectorScreen } from "react-icons/pi";

const NavItem = ({name, isSelected, onClick, onDelete}) => {

    const contextMenuItems = [
        {
            name: "Open",
            onClick: onClick
        },
        {
            name: "Delete",
            onClick: onDelete
        }
    ]

    return (
        <div className={`${Styles.navItem} ${isSelected? Styles.selected : ""}`}>
            <div className={Styles.navName} onClick={onClick}>
                <PiProjectorScreen /> {" " + name}
            </div>

            <ContextMenu className={Styles.contextMenuButton} options={contextMenuItems}/>
        </div>
    );
}

export default NavItem;