import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Notification from "./Notification";

function Notifications(){

    const notifications = useSelector(state=>state.notifications);
    const [eles, setEles]=useState(notifications)

    useEffect(()=>{
        setEles(notifications)
    },[notifications])

    return(
        <div className="notifications">
            {eles.map((i, idx)=>
                <Notification key={idx} data={i}/>
            )}
        </div>
    )

}

export default Notifications;