function Button(props) {

    const clicker = (e) => {
        e.preventDefault();
        props.click()
    }

    return (
        <>
            {props.form ?
                <input type={"submit"} className={"button " + props.theme} value={props.vl} onClick={clicker}/>
                :
                <button className={"button " + props.theme} onClick={clicker}>{props.vl}</button>
            }
        </>

    )
}

export default Button;