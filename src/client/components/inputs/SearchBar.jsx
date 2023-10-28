import TextInput from "./TextInput";
import Button from "./Button";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../redux/api/api";
import {clearSearch} from "../../redux/slices/dataSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {notify} from "../../redux/slices/notificationSlice";

function SearchBar() {

    const [text, setText] = useState("");
    const results = useSelector(state=>state.data.results);
    const notLength = useSelector(state=>state.notifications.length)
    const dispatch= useDispatch();

    const [trigger, {isLoading}]=api.endpoints.searchPost.useLazyQuery();

    const onSubmit = async () => {
        try {
            await trigger(text);
            setText("");
        } catch(err){
            dispatch(notify({
                id: notLength,
                type:"fail",
                text:"Error posting",
                active:true
            }))
        }
    }


    return (
        <>
            {isLoading&&<FontAwesomeIcon className={"searchLoad"} icon={faSpinner} size={"2x"} spin/>}
            <div className="searchBar">
                <TextInput placeholder={"Search.."} type={"text"} vl={text} chg={setText}/>
                <Button click={onSubmit} theme={"submit"}>SEARCH</Button>
            </div>
            {results.search&&<Button click={()=>dispatch(clearSearch())} theme={"submit"}>CLEAR SEARCH</Button>}
        </>
    )
}

export default SearchBar;