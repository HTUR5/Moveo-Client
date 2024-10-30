
import { createContext, useContext } from 'react'
import { io } from 'socket.io-client';

export const SocketContext = createContext(io())

const useSocket = () => useContext(SocketContext)

export default useSocket;