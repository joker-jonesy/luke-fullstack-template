import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Posts from "./pages/Posts";
import User from "./pages/User";
import Post from "./pages/Post";
import { socket } from './socket';
import {setIsConnected,setEvents} from "./redux/socket";
import {useSelector} from "react-redux";

function App() {

    const socketEvents = useSelector(state=>state.sockets.events);


    useEffect(() => {
        socket.connect();
        function onConnect() {
            setIsConnected(true);
            console.log("connected")
        }

        function onDisconnect() {
            setIsConnected(false);
            console.log("disconnected")
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    useEffect(() => {
        function onEvent(value) {
            setEvents(socketEvents.concat(value));
            console.log("event trigger");
        }

        socket.on('foo', onEvent);

        return () => {
            socket.off('foo', onEvent);
        };
    }, [socketEvents]);

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
