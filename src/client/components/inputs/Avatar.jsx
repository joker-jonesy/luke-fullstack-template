import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faUser} from "@fortawesome/free-solid-svg-icons";
import {useRef} from "react";
import Button from "./Button";
import {useEditMutation} from "../../redux/api/auth";

function Avatar({mod}) {

    const me = useSelector(state => state.auth.credentials.user);
    const [edit, {isLoading}] = useEditMutation();
    const fileButton = useRef(null);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        console.log(base64)
        edit({image: base64})

    };

    return (
        <>
            <div className={"avatar"}>
                {!me.image ? <FontAwesomeIcon icon={faUser}/>: <img alt={"profile"} src={`${me.image}`}/>}
            </div>
            {isLoading&& <FontAwesomeIcon icon={faSpinner} spin/>}
            {mod && <input ref={fileButton} type={"file"} style={{"display": "none"}} accept=".jpg, .jpeg, .png" onChange={uploadImage}/>}
            {mod &&<Button click={()=>fileButton.current.click()}  vl={"CHANGE PROFILE IMAGE"} theme={"submit"}/>}
        </>
    )


}

export default Avatar;