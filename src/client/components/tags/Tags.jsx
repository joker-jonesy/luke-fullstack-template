import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

function Tags(props) {

    return (
        <>
            <h2>Tags</h2>
            <div className="tags">
                {props.data ? props.data.map((i, idx) =>
                    <div className="tag" key={idx}>
                        {i.tag.name}
                    </div>
                ) : props.data === undefined ? "" : <FontAwesomeIcon icon={faSpinner} spin/>}
            </div>
        </>
    )
}

export default Tags