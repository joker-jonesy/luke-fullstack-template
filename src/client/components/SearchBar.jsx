import TextInput from "./inputs/TextInput";
import Button from "./inputs/Button";
import {useState} from "react";
import {useSearchPostMutation} from "../reducers/api";

function SearchBar() {

    const [text, setText] = useState("");
    const [searchPost] = useSearchPostMutation();

    const onSubmit = async () => {
        await searchPost({
            input: text
        }).then(() => {
            console.log("searched")
            setText("");
        }).catch((error) => {
            console.log(error)
        })
    }


    return (
        <div className="searchBar">
            <TextInput placeholder={"Search.."} type={"text"} vl={text} chg={setText}/>
            <Button click={onSubmit} theme={"submit"}>SEARCH</Button>
        </div>
    )
}

export default SearchBar;