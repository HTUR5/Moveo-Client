import React from 'react'
import styles from './style.module.css'


export default function Title({text="", font="75px"}) {
  const hebrewRegex = /[\u0590-\u05FF]/; // Hebrew Unicode range

  return (
    <div className={styles.title}>
      <div className={styles.shadow}></div>
      <span className={hebrewRegex.test(text) ? styles.he : styles.text} style={{fontSize: font}}>{text}</span>
    </div>
    )
}
