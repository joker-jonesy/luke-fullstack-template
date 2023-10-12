import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

function Tags(props){

    console.log(props.data)

    return(
        <div className="tags">
            {props.data?props.data.map((i, idx)=>
                <div className="tag" key={idx}>
                    <h3>{i.tag.name}</h3>
                </div>
            ):props.data===undefined?"":<FontAwesomeIcon icon={faSpinner} spin/>}
        </div>
    )
}

export default Tags