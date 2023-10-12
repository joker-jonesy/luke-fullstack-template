function Tags(props){
    return(
        <div className="tags">
            {props.data.map((i, idx)=>
                <div className="tag" key={idx}>
                    <h3>{i.tag.name}</h3>
                </div>
            )}
        </div>
    )
}

export default Tags