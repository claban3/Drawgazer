import "./ColorCustomization.css";
import { useState } from "react";
import { ChromePicker } from 'react-color';


export default function ColorCustomization(props) {
    const [buttonSelection, setButtonSelection] = useState(null);
    const [pickerColor, setPickerColor] = useState("#FFFFFF");
    const buttons = ["--triangleColor", "--squareColor", "--circleColor", "--shapeButtonColor", "--animationButtonColor"]

    function colorPickerChangeHandler(color) {
        if(buttonSelection) {
            setPickerColor(color);
            props.colorChangeHandler(buttonSelection, color);
        }
    }

    function buttonSelectionHandler(newButtonSelection) {
        setButtonSelection(newButtonSelection);
        let buttonColor = document.documentElement.style.getPropertyValue(newButtonSelection);
        setPickerColor(buttonColor);
    }

    return (
        <div className="settings-content">

            <div className="color-picker-container">
                {/* TODO: I'm not sure how the color picker will behave on hawkeye */}
                <ChromePicker
                    color={pickerColor}
                    onChange={colorPickerChangeHandler} />
                
                <div className="reset-container">
                    {
                        props.resetColors === true &&
                        <a className="reset-color-button"
                           onClick={() => props.colorChangeHandler("reset")}>
                                reset default
                        </a> 
                    }
                </div>
            </div>

            <div className="buttons-container">
                <div className="buttons-row one">
                    
                    <a className="shape-icon-wrapper"
                       onClick={() => buttonSelectionHandler(buttons[0])}>

                        <svg  className="shape-icon-settings" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169.82 147.06">
                            <polygon className="triangle "id="triangle" points="84.91 3 2.6 145.56 167.22 145.56 84.91 3" stroke="#231f20" strokeMiterlimit="10" strokeWidth="3"/>
                        </svg>

                    </a>

                    <a className="shape-icon-wrapper"
                       onClick={() => buttonSelectionHandler(buttons[1])}>

                        <svg className="shape-icon-settings" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147 147">
                            <rect className="square" id="square" x="1.5" y="1.5" width="144" height="144" stroke="#231f20" strokeMiterlimit="10" strokeWidth="3"/>
                        </svg>

                    </a>

                    <a className="shape-icon-wrapper"
                       onClick={() => buttonSelectionHandler(buttons[2])}>

                        <svg className="shape-icon-settings" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147 147">
                            <circle className="circle" id="circle" cx="73.5" cy="73.5" r="72" stroke="#231f20" strokeMiterlimit="10" strokeWidth="3"/>
                        </svg>

                    </a>

                </div>

                <div className="buttons-row two">
                    <a className="shape-button"
                        onClick={() => buttonSelectionHandler(buttons[3])}>
                            Shape
                    </a>

                    <a className="animation-button"
                        onClick={() => buttonSelectionHandler(buttons[4])}>
                            Animation
                    </a>
                </div>

            </div>
        </div> 
   ); 
}