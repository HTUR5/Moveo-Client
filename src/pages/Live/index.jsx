import React, { useEffect, useRef, useState } from 'react'
import Title from '../../componenents/Title'
import styles from './style.module.css'
import TextArea from '../../componenents/TextArea'
import useUser from '../../context/UserContext'
import Button from '../../componenents/Button'
import useSocket from '../../context/SocketContext'
import usePage from '../../context/PageContext'
import MainAdmin from '../MainAdmin'
import MainPlayer from '../MainPlayer'
import useAutoScroll from '../../hooks/useAutoScroll'

export default function Live({ name, artist, lyrics }) {

    const { setPage } = usePage()
    const { user } = useUser()
    const { socket } = useSocket()
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollRef = useRef(null); // This ref will point to the lyrics 

    useAutoScroll(scrollRef.current, isScrolling);

    //detect the language of the song for show the right direction of the page
    const detectLanguage = (text) => {
        const hebrewRegex = /[\u0590-\u05FF]/; // Hebrew Unicode range
        const englishRegex = /[a-zA-Z]/; // English alphabet
    
        if (hebrewRegex.test(text)) {
            return "he"; // Hebrew
        } else if (englishRegex.test(text)) {
            return "en"; // English
        } else {
            return "unknown"; // If neither Hebrew nor English
        }
    };

    useEffect(() => {
        if (socket) {
            //if the rehearsal has stopped by the admin
            socket.on('stop', () => {
                // console.log("stop");
                setPage(user.permission == "admin" ? <MainAdmin /> : <MainPlayer />);
            });

            // Clean up listener when the component unmounts
            return () => {
                socket.off('stop');
            };
        }
    }, [socket]);

    //event for stop the rehearsal by the admin
    const handleStopClick = () => {
        // console.log("stop")
        socket.emit('stop');
    };

    const toggleScrolling = () => {
        setIsScrolling((prev) => !prev);
    };

    return (
        <div className={styles.live}>
            <div className={styles.title}>
                <Title text={name} font={"35px"} />
                <Title text={artist} font={"30px"} />
            </div>
            <TextArea>
                <div ref={scrollRef} id="lyrics" className={`${styles.lyrics} ${detectLanguage(name) == "he"? styles.he : null}`} >
                    {lyrics.map((line, lineIndex) => (
                        <div key={lineIndex} className={styles.line}>
                            {line.map((item, wordIndex) => (
                                <span key={wordIndex} className={styles.word}>
                                    {item.chords && user.instrument != "singer" && <div className={styles.chord}>{item.chords}</div>}
                                    {item.lyrics}&nbsp;
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </TextArea>
            <div className={styles.buttons}>
                <div onClick={()=>toggleScrolling()}>
                    <Button text={ isScrolling ? "Stop Scrolling" : "Start Scrolling"} />
                </div>
                {user.permission == 'admin' ?
                    <div className={styles.button}>
                        <Button text={"stop"} onClick={() => handleStopClick()} />
                    </div>
                    : null}
            </div>
        </div>
    )
}
