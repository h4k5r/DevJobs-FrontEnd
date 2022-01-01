import React from "react";
import classes from "./MainButton.module.css"
import Image from "next/image";
import {CombineClasses} from "../../Utils/Uitls";

const MainButton: React.FC<{ text: string, onClickHandler: (_:any) => void, classes: string[],disabled?:boolean }> = (props) => {
    return (
        <button
            className={CombineClasses(...props.classes,classes.mainButton)}
            onClick={props.onClickHandler}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    );
};
export default MainButton;

export const ImageMainButton: React.FC<{ image: string, text?: string, onClickHandler: () => void, classes: string[] }> = (props) => {
    return (
        <>

            <button
                className={CombineClasses(classes.imageMainButton, ...props.classes)}
                onClick={props.onClickHandler}
            ><Image src={props.image} alt="" className={classes.imageMainButton__Image} height={'30'} width={'30'}
                    layout={'fixed'}/>
                {props.text}
            </button>
        </>
    );
};