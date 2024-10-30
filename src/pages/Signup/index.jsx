import React, { useState } from 'react';
import Title from '../../componenents/Title';
import TextArea from '../../componenents/TextArea';
import styles from './style.module.css';
import Button from '../../componenents/Button';
import { useApi } from '../../hooks/useApi';
import usePage from '../../context/PageContext';
import Login from '../Login';
import { useNavigate } from 'react-router-dom';

export default function Signup({ permission = "user" }) {

    const { setPage } = usePage()
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        instrument: ''
    });

    // const [responseData, setResponseData] = useState(null);
    const [responseError, setResponseError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //register with username, password and instrument and show errors if exist
    const handleSubmit = async (event) => {
        // event.preventDefault(); 
        setIsLoading(true);
        // setResponseError(null);
        const modifiedFormData = {
            ...formData,
            permission: permission
        };
        const { data, error } = await useApi('/register', "POST", modifiedFormData);
        if (error) {
            // console.log(error)
            setResponseError(error);
        } else {
            // setResponseData(data);
            if (permission === "admin") {
                navigate('/');
            } else {
                setPage(<Login />);
            }
        }
        setIsLoading(false);
    };

    return (
        <div className={styles.Signup}>
            <Title text="Sign Up" />
            <div className={styles.userDetails}>
                <TextArea title="Username">
                    <input
                        name="username"
                        placeholder="Enter your username"
                        maxLength={700}
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </TextArea>
                <TextArea title="Password">
                    <input
                        name="password"
                        type="password"
                        placeholder="must be over 6 characters"
                        maxLength={700}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </TextArea>
                <TextArea title="role">
                    <input
                        name="instrument"
                        placeholder="singer/guitar/piano/drums"
                        maxLength={700}
                        value={formData.instrument}
                        onChange={handleInputChange}
                        required
                    />
                </TextArea>
            </div>
            <Button text="Sign Up" onClick={handleSubmit} />
            {isLoading && <p>Loading...</p>}
            {responseError && <p style={{ color: 'red' }}>Error: {responseError.message}</p>}
        </div>
    );
}
