
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Posts from "./pages/Posts";
import User from "./pages/User";
import Post from "./pages/Post";

function App() {
    const me = useSelector((state) => state.auth.credentials.user);


    return (
        <div className="App">
            <Routes>
                <Route index element={<Posts/>}/>
                <Route path={"/register"} element={<AuthForm/>}/>
                <Route path={"/user"} element={<User/>}/>
                <Route path={"/post/:id"} element={<Post/>}/>
            </Routes>
        </div>
    );
}

export default App;
