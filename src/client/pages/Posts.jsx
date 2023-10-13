import {useGetPostsQuery} from "../reducers/api";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Post from "../components/Post";
import {Link} from "react-router-dom";

function Posts() {

    const postsData = useGetPostsQuery();
    const posts = useSelector(state=>state.data.posts)

    const [load, setLoad] = useState(true)

    useEffect(() => {
        setLoad(postsData.isLoading)
    }, [postsData])

    return (

            <section>
            {load ? <h1>Loading...</h1>
                : posts.length === 0||!posts
                    ? <h1>No Posts Listed</h1>
                    : posts.map((i, idx) =>
                        <Link key={idx} to={"/post/"+i.id}><Post  data={i} delete={false}/></Link>)
            }
            </section>
    )
}

export default Posts