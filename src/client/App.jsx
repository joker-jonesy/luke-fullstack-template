import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Posts from "./pages/Posts";
import User from "./pages/User";
import Post from "./pages/Post";
import { socket } from './socket';
import {setIsConnected, setFooEvents} from "./redux/socket";
import {useSelector} from "react-redux";

function App() {


    const sockets = useSelector(state=>state.sockets);


    useEffect(() => {
        socket.connect();
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [sockets.events]);

    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Posts/>}/>
                <Route path={"/register"} element={<AuthForm/>}/>
                <Route path={"/user"} element={<User/>}/>
                <Route path={"/post/:id"} element={<Post/>}/>
            </Routes>
        </div>
    );
}

export default App;
