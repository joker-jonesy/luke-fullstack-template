

function Comments({data}) {
    return (
        <>
            <h2>Comments</h2>
            <div className="comments">
                {data.map((i) =>
                    <div key={i.id} className="comment">
                        <h3>{i.author.username}</h3>
                        <p>{i.text}</p>
                    </div>
                )}
            </div>

        </>
    )
}

export default Comments;