import {useEffect, useState} from "react";
import TextInput from "./inputs/TextInput";
import {useAddPostMutation} from "../redux/api/posts";
import {useGetTagsQuery} from "../redux/api/api";
import Button from "./inputs/Button";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {notify} from "../redux/slices/notificationSlice";
function CreatePostForm(props){
    const {me} = props;
    const [addPost]= useAddPostMutation();
    const {data, isLoading}= useGetTagsQuery();
    const notLength = useSelector(state=>state.length)

    const [text, setText]=useState("");
    const [error, setError]=useState("");
    const [tags,setTags]= useState([]);
    const [change, setChange]= useState(false)
    const dispatch = useDispatch()

    const toggleTag = (tag)=>{
        const newTags =tags;
        if(tags.find((i)=>i.name===tag.name)){
            const index = tags.indexOf(tag);
            newTags.splice(index,1);
            setTags(newTags)
        }else{
            newTags.push(tag);
            setTags(newTags)
        }
        setChange(!change)
    }

    useEffect(()=>{
        // console.log("changed")
    }, [change])

    const onSubmit = async()=>{
        if(text.length>=3){
            await addPost({
                text:text,
                authorId: me.userId,
                tags: tags
            }).then(()=>{
                console.log("added");
                setText("");
                setTags([]);
                dispatch(notify({
                    id: notLength,
                    type:"success",
                    text:"Post Created!",
                    active:true
                }))
            }).catch(()=>{
                console.log("error")
            })
        } else{
            setError("Not enough characters to submit post")
        }

    }

    return(
        <div className={"createForm"}>
            <h1>Create a Post</h1>
            <TextInput type={"text"} vl={text} chg={setText}/>
            <h3>Add Tags</h3>
            <div className={"tags"}>
                {isLoading? <FontAwesomeIcon icon={faSpinner} spin/>: data.map((i)=>
                    <div key={i.id} className={"tag"} onClick={()=>toggleTag({name:i.name, id:i.id})} style={{border: tags.find(x=>i.name===x.name)?"3px solid blue":"none"}}>{i.name}</div>
                ) }
            </div>
            <Button click={onSubmit} vl={"SUBMIT"} theme={"submit"}/>
            <h1 style={{"color":"red"}}>{error}</h1>
        </div>
    )
}

export default CreatePostForm;