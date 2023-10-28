import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {removeNotify} from "../../redux/slices/notificationSlice";

function Notification(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(removeNotify({
            ...props.data,
            active: false
        })), 3000);
    }, []);


    return (
        <div className={"notification"} style={{display: props.data.active? "flex":"none"}}>
            <h3 className={props.data.type}>{props.data.text}</h3>
        </div>
    )
}

export default Notification;