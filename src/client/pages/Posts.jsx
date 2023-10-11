import {useGetPostsQuery} from "../reducers/api";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function Posts() {

    const postsData = useGetPostsQuery();
    const posts = useSelector(state=>state.data.posts)

    const [load, setLoad] = useState(true)

    useEffect(() => {
        setLoad(postsData.isLoading)
    }, [postsData])

    return (
        <>
            {load ? <h1>Loading...</h1>
                : posts.length === 0||!posts
                    ? <h1>No Posts Listed</h1>
                    : posts.map((i) =>
                        <div key={i.id}>
                            <h1>{i.text}</h1>
                        </div>)
            }
        </>
    )
}

export default Posts