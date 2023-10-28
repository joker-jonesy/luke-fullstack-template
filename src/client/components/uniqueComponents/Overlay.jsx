import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

function Overlay(props){

    const toggler =()=>{
        props.toggle();
    }

    return(
        <div className="overlay" style={{display:props.show?"flex":"none"}}>
            <FontAwesomeIcon className={"close"} icon={faXmark} onClick={toggler} size={"4x"} />
            {props.children}
        </div>
    )
}

export default Overlay;