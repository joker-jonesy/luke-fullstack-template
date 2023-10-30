import Comment from "./Comment";


function Comments({data, post}) {




    const popularComments = [...data].sort((a,b)=>{
        const aUpVotes = a.vote.filter(i=>i.type==="up").length;
        const bUpVotes = b.vote.filter(i=>i.type==="up").length;
        const aDownVotes = a.vote.filter(i=>i.type==="down").length;
        const bDownVotes = b.vote.filter(i=>i.type==="down").length;
        const aPopularity=aUpVotes-aDownVotes;
        const bPopularity=bUpVotes-bDownVotes;

        return bPopularity-aPopularity;
    });



    return (
        <>
            <h2>Comments</h2>
            <div className="comments">
                {popularComments.map((i) =>
                    <Comment key={i.id} post={post} commentId={i.id} data={i}/>
                )}
                {popularComments.length===0&& <h2>No Comments on This Post</h2>}
            </div>

        </>
    )
}

export default Comments;