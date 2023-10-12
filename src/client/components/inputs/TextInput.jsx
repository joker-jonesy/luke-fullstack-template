function TextInput(props){

    const changed = (event)=>{
        props.chg(event.target.value)
    }

    return(
        <input placeholder={"..."} className={"textField"} value={props.vl} type={props.type} onChange={changed}/>
    )
}

export default TextInput;