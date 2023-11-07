import {useGetPostsQuery, useGetPagePostQuery} from "../redux/api/posts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Post from "../components/posts/Post";
import Button from "../components/inputs/Button";
import {api} from "../redux/api/api";

function Posts() {

    // const postsData = useGetPostsQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * 4;
    const indexOfFirstItem = indexOfLastItem - 4;
    const {isLoading} = useGetPostsQuery();
    const last = useSelector(state => state.data.last);
    const posts = useSelector(state => state.data.posts);
    const results = useSelector(state => state.data.results);
    const me = useSelector(state => state.auth.credentials.user);
    const currentItems = [...posts].slice(indexOfFirstItem, indexOfLastItem);
    const currentSearch = results.rslt.slice(indexOfFirstItem, indexOfLastItem);



    const postEle = (
        currentItems.length === 0 || !posts
            ? <h1>No Posts Shown</h1>
            : currentItems.map((i, idx) =>
                <Post key={idx} data={i} delete={me.admin}/>
            ))

    const searchEle = (
        currentSearch.length === 0 || !results.rslt
            ? <>
                <h1>No Results Found</h1>
            </>
            : currentSearch.rslt.map((i, idx) =>
                <Post key={idx} data={i} delete={me.admin}/>
            ))


    return (
        <>
            <section>
                {isLoading ? <h1>Loading...</h1>
                    : results.search ?
                        <>{searchEle}</> :
                        <>{postEle}</>
                }
                {!isLoading &&
                    <div className={"pageNav"}>
                        {currentPage !== 1 ? <Button click={() => setCurrentPage(currentPage-1)}>Previous</Button> :
                            <Button theme={"inactive"}>Previous</Button>}
                        {indexOfLastItem<posts.length ? <Button click={() => setCurrentPage(currentPage + 1)}>Next</Button> :
                            <Button theme={"inactive"}>Next</Button>}
                    </div>
                }


            </section>

        </>
    )
}

export default Posts