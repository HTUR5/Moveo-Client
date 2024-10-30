import React, { useState } from 'react'
import Title from '../../componenents/Title'
import TextArea from '../../componenents/TextArea'
import styles from './style.module.css'
import Button from '../../componenents/Button'
import ResultAdmin from '../ResultAdmin'
import usePage from '../../context/PageContext';
import { useApi } from '../../hooks/useApi';


export default function MainAdmin() {
    const { setPage } = usePage()
    const [search, setSearch] = useState('')
    const [responseError, setResponseError] = useState();

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearch = async (songName) => {
        let url = 'http://localhost:3000/songs/'
        if (songName) url += 'filter/' + songName

        const { data, error } = await useApi(url);
        console.log(error)
        if (error) {
            setResponseError(error);
        } else {
            setPage(<ResultAdmin results={data} />)
        }
    }
    return (
        <div className={styles.mainAdmin}>
            <div className={styles.title}>
                <Title text="search" />
                <Title text="any song" />
            </div>
            <TextArea>
                <input
                    name="search"
                    placeholder="enter a name of a song"
                    maxLength={700}
                    value={search}
                    onChange={handleInputChange}
                />
            </TextArea>
            <div className={styles.welcome}>
            {responseError && <p style={{ color: 'red' }}>{responseError.message}</p>}
            <Button text='search' onClick={() => handleSearch(search)} />
            <Button text='show all' onClick={() => handleSearch()} />
            </div>
        </div>
    )
}
