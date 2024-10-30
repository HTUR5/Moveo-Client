import React, { useContext, useEffect, useState } from 'react'
import Title from '../../componenents/Title'
import TextArea from '../../componenents/TextArea'
import styles from './style.module.css'
import Button from '../../componenents/Button';
import { useApi } from '../../hooks/useApi';
import usePage from '../../context/PageContext';
import MainPlayer from '../MainPlayer';
import useUser from '../../context/UserContext';
import MainAdmin from '../MainAdmin';
import { io } from 'socket.io-client';
import { SocketContext } from '../../context/SocketContext';

export default function Login() {
    const { setPage } = usePage()
    const { user, setUser } = useUser()
    const { socket, setSocket } = useContext(SocketContext);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [responseData, setResponseData] = useState(null);
    const [responseError, setResponseError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //submit username ans password, if aproved open a socket
    const handleSubmit = async () => {
        setIsLoading(true);
        setResponseError(null);
        const { data, error } = await useApi('/login', "POST", formData);
        if (error) {
            setResponseError(error);
        } else {
            setResponseData(data);
            setUser(data)
            localStorage.authToken = data;
            setSocket(io(import.meta.env.VITE_BASE_PATH));
            setPage(data.permission === "user" ? <MainPlayer /> : <MainAdmin />)
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (!socket) return;
        console.log("Setting up socket listeners");
        socket.on('connect', () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on('disconnect', () => {
            console.log("Socket disconnected");
        });

        // Clean up on unmount
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <div className={styles.login}>
            <Title text="log in" />
            <div className={styles.userDetails}>
                <TextArea title="Username">
                    <input
                        name="username"
                        placeholder="Enter your username"
                        maxLength={700}
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </TextArea>
                <TextArea title="Password">
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        maxLength={700}
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </TextArea>
            </div>
            <Button text="login" onClick={handleSubmit} />
            {isLoading && <p>Loading...</p>}
            {responseError && <p style={{ color: 'red' }}>Error: {responseError.message}</p>}
        </div>
    )
}

