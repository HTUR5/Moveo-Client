import React, { useContext, useEffect } from 'react'
import styles from './style.module.css'
import Wait from '../../componenents/Wait'
import { SocketContext } from '../../context/SocketContext';
import Live from '../Live';
import usePage from '../../context/PageContext';

export default function MainPlayer() {
  const { socket } = useContext(SocketContext);
  const { setPage } = usePage()


  useEffect(() => {
    if (socket) {
      // Listen for the 'start' event from the server - wait for admit to start the rehearsal
      socket.on('start', (songData) => {
        // console.log('Received start event with song data:', songData);
        setPage(<Live name={songData.name} artist={songData.artist} lyrics={songData.lyrics} />);
      });

      return () => {
        socket.off('start');
      };
    }
  }, [socket]);

  return (
    <div className={styles.MainPlayer}>
      <Wait title={<span>Waiting for next song</span>} />
    </div>)
}
