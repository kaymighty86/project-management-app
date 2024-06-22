import Styles from './navItem.module.css';

import ContextMenu from "../contextMenu/contextMenu.jsx";

const NavItem = ({name, isSelected, onClick, onDelete}) => {

    const contextMenuItems = [
        {
            name: "Delete",
            onClick: onDelete
        }
    ]

    return (
        <div className={`${Styles.navItem} ${isSelected? Styles.selected : ""}`}>
            <div className={Styles.navName} onClick={onClick}>
                <i className="fa-solid fa-angle-right"></i>{" " + name}
            </div>

            <ContextMenu className={Styles.contextMenuButton} options={contextMenuItems}/>
        </div>
    );
}

export default NavItem;