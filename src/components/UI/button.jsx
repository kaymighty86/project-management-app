import Styles from "./button.module.css";

const Button = (Props) => {
    //setting a color type to the button
    let chosenColorType = Styles.darkGray;
    switch(Props.colorType){
        case '1' : chosenColorType = Styles.lightGray;
        break;
        case '2' : chosenColorType = Styles.darkGray;
        break;
        case '3' : chosenColorType = Styles.transparent;
        break;
    }
    //----------------------------------

    const classes = `${Styles.buttonStyle} ${chosenColorType} ${Props.className != undefined? Props.className : ""}`;

    //we need to delete the colorType property from the Props object becasue we are about to pass the Props object on to the JSX element which doesn't recognise it as a property
    const finalProps = {...Props};//first spread the Props into a new object becasue we cannot delete properties from it
    delete finalProps['colorType'];//now delete from here then pass it on

    return (
        <button {...finalProps} className={classes}>{Props.children}</button>
    )
}

export default Button;