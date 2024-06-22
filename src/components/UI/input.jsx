import Styles from "./input.module.css";
import { forwardRef } from "react";

const Input = forwardRef(function Input (Props, ref){
    const classes = `${Styles.inputStyle} ${Props.className != undefined? Props.className : ""}`;

    return <input ref={ref} {...Props} className={classes} />;
});

export default Input;