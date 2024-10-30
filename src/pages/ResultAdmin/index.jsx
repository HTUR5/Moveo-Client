import React from 'react'
import styles from './style.module.css'
import usePage from '../../context/PageContext';
import Live from '../Live';
import useSocket from '../../context/SocketContext';
import Button from '../../componenents/Button';
import MainAdmin from '../MainAdmin';


export default function ResultAdmin({ results =[] }) {
    const { setPage } = usePage()
    const { socket } = useSocket()

    const handleSongClick = (song) => {
        socket.emit('start', song);
        setPage(<Live name={song.name} artist={song.artist} lyrics={song.lyrics} />);
    };
 
    return (
        <div className={styles.resultAdmin}>
            {results.map(s => {
                return (
                    <div className={styles.song} key={s.name} onClick={() => handleSongClick(s)}
                        style={{ cursor: 'pointer' }} >
                        <img src={s.image} alt={`${s.name} album art`}></img>
                        <div className={styles.songData}>
                            <div style={{ color: "VAR(--orange-color)" }}>{s.name}</div>
                            <div>{s.artist}</div>
                        </div>
                    </div>
                )
            })}
            <Button text='Back' onClick={() => setPage(<MainAdmin />)} />

        </div>
    )
}
