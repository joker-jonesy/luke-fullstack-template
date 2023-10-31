import {useGetPostsQuery, useGetPagePostQuery} from "../redux/api/posts";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Post from "../components/posts/Post";
import Button from "../components/inputs/Button";
import {api} from "../redux/api/api";

function Posts() {

    // const postsData = useGetPostsQuery();
    const [page, setPage] = useState(1);
    const [last, setLast] = useState(null)
    const {data, isLoading} = useGetPagePostQuery(page);
    // const {data, isLoading} = useGetPostsQuery(page);
    const posts = useSelector(state => state.data.posts);
    const results = useSelector(state => state.data.results);
    const me = useSelector(state => state.auth.credentials.user);
    const [trigger, {isLoading:load, data: result}]=api.endpoints.getPagePost.useLazyQuery();

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

    const paginate = async (nm)=>{
        setPage(nm);
        trigger(page)
        console.log(result)
        // if (result.length<4) {
        //     setLast(page)
        // }
    }


    return (
        <>
            <section>
                {isLoading ? <h1>Loading...</h1>
                    : results.search ?
                        <>{searchEle}</> :
                        <>{postEle}</>
                }
                {/*{!load &&*/}
                {/*    <div className={"pageNav"}>*/}
                {/*        {page !== 1 ? <Button click={() => paginate(page-1)}>Previous</Button> :*/}
                {/*            <Button theme={"inactive"}>Previous</Button>}*/}
                {/*        {page !== last ? <Button click={() => paginate(page + 1)}>Next</Button> :*/}
                {/*            <Button theme={"inactive"}>Next</Button>}*/}
                {/*    </div>*/}
                {/*}*/}


            </section>

        </>
    )
}

export default Posts