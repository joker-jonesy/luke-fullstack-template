import {useGetPostsQuery} from "../redux/api/posts";
import {useEffect, useState} from "react";
import { useSelector} from "react-redux";
import Post from "../components/posts/Post";
import SearchBar from "../components/inputs/SearchBar";


function Posts() {

    const postsData = useGetPostsQuery();
    const posts = useSelector(state => state.data.posts);
    const results = useSelector(state => state.data.results);
    const me = useSelector(state => state.auth.credentials.user);
    const [load, setLoad] = useState(true)

    useEffect(() => {
        setLoad(postsData.isLoading)
    }, [postsData, results])

    const postEle = (
        posts.length === 0 || !posts
            ? <h1>No Posts Shown</h1>
            : posts.map((i, idx) =>
                <Post key={idx} data={i} delete={me.admin}/>
            ))


    const searchEle = (
        results.rslt.length === 0 || !results.rslt
            ? <>
                <h1>No Results Found</h1>
            </>
            : results.rslt.map((i, idx) =>
                <Post key={idx} data={i} delete={me.admin}/>
            ))


    return (

        <section>
            {load ? <h1>Loading...</h1>
                : results.search ?
                    <>{searchEle}</> :
                    <>{postEle}</>
            }
        </section>
    )
}

export default Posts