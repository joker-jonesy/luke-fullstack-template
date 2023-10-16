import {useEffect} from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {WebSocketServer} from "ws";
const useWebSockets = () => {



    useEffect(() => {
        const websocket = new WebSocketServer()

    }, [])
}

export default useWebSockets;