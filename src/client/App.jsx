import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Posts from "./pages/Posts";
import User from "./pages/User";
import Post from "./pages/Post";
import { socket } from './socket';
import {setIsConnected, setFooEvents} from "./reducers/socket";

function App() {


    useEffect(() => {
        socket.connect();
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value) {
            setFooEvents(value);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

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
