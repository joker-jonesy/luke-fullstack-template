import TextInput from "./inputs/TextInput";
import Button from "./inputs/Button";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {api, clearSearch} from "../reducers/api";

function SearchBar() {

    const [text, setText] = useState("");
    const results = useSelector(state=>state.data.results);
    const dispatch= useDispatch();
    const [trigger]=api.endpoints.searchPost.useLazyQuery();

    const onSubmit = async () => {
        try {
            await trigger(text);
            setText("");
        } catch(err){
            console.log(err)
        }
    }


    return (
        <>
            <div className="searchBar">
                <TextInput placeholder={"Search.."} type={"text"} vl={text} chg={setText}/>
                <Button click={onSubmit} theme={"submit"}>SEARCH</Button>
            </div>
            {results.search&&<Button click={()=>dispatch(clearSearch())} theme={"submit"}>CLEAR SEARCH</Button>}
        </>
    )
}

export default SearchBar;