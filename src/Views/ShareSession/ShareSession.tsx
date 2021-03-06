import { useState } from "react";
import './ShareSession.css';
import '../../App.css';

import exit from '../../Images/exit.png';
import share_session from '../../Images/share_session.png';

export default function ShareSession(props) {
    const shareSessionStates = ["closed", "opening", "open", "closing"];
    const [text, setText] = useState(props.token);

    function submitHandler(event) {
        event.preventDefault();
        if(text.length === 8) {
            props.submissionHandler(text);
        }
        else {
            alert("Please enter an 8 character friend ID");
        }
    }
    
    function onChangeHandler(event) {
        setText(event.target.value);
    }

    return (
        <div className="shareSession-outer-container"
             onAnimationEnd={() => props.shareSessionStateChangeHandler()}

             onClick={() => props.shareSessionStateChangeHandler()}>
                
            <div className={"shareSession-container " + (shareSessionStates[props.shareSessionState])}
                 onClick={(event) => {event.stopPropagation();}}>

                <a className="shareSession-exit-wrapper" 
                   onClick={() => props.shareSessionStateChangeHandler()}>
                    <img className="shareSession-exit"
                        src={exit}
                        alt="Exit Share Session"
                        />
                </a>

                <div className="friend-ID-input-container">

                    <div className="prompt">
                        <b>Enter Friend ID to share canvas:</b>
                    </div>

                    <form className="friend-ID-input-box" onSubmit={submitHandler}>

                        {/* TODO: Unsure if input tags are selectable in hawkeye */}
                        <input
                            className="friend-ID-input"
                            type="text"
                            placeholder="Friend ID"
                            value={text}
                            spellCheck="false"
                            onChange={onChangeHandler}
                        />

                        <a className="friend-ID-icon-wrapper" onClick={submitHandler}>
                            <img className="friend-ID-icon"
                                 src={share_session}
                                 alt="Share Session"/>
                        </a>

                    </form>

                </div>

                <p className="friend-ID-local" 
                   id="friend-ID-local">
                        <b>Your Friend ID: 

                        <span className="spn"> {props.uniqueId} </span>
                          
                        </b>
                </p>
                
            </div>
        </div>
    );  
}