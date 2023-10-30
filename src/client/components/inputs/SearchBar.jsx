import TextInput from "./TextInput";
import Button from "./Button";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {api} from "../../redux/api/api";
import {clearSearch} from "../../redux/slices/dataSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faSpinner, faXmark} from "@fortawesome/free-solid-svg-icons";
import {notify} from "../../redux/slices/notificationSlice";
import {useNavigate} from "react-router-dom";

function SearchBar() {

    const [text, setText] = useState("");
    const results = useSelector(state=>state.data.results);
    const notLength = useSelector(state=>state.notifications.length)
    const dispatch= useDispatch();
    const navigate = useNavigate();

    const [trigger, {isLoading}]=api.endpoints.searchPost.useLazyQuery();

    const onSubmit = async () => {
        try {
            await trigger(text);
            setText("");
            navigate("/")
        } catch(err){
            dispatch(notify({
                id: notLength,
                type:"fail",
                text:"Error posting",
                active:true
            }))
        }
    }

    const onClear = ()=>{
        dispatch(clearSearch());
        navigate("/")
    }


    return (
        <>
            <div className={"searchWrap"}>
            {isLoading&&<FontAwesomeIcon className={"searchLoad"} icon={faSpinner} size={"2x"} spin/>}
            <div className="searchBar">
                <TextInput placeholder={"Search.."} type={"text"} vl={text} chg={setText}/>
                <Button click={onSubmit} theme={"submit"}><span>SEARCH</span><FontAwesomeIcon icon={faSearch}/></Button>
                {results.search&& <FontAwesomeIcon className={"clear"} icon={faXmark} onClick={onClear} size={"2x"}/>}
            </div>

            </div>
        </>
    )
}

export default SearchBar;