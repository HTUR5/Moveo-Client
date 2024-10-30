import React from 'react'
import styles from './style.module.css'


export default function Title({text="", font="75px"}) {
  return (
    <div className={styles.title}>
      <div className={styles.shadow}></div>
      <span className={styles.text} style={{fontSize: font}}>{text}</span>
    </div>
    )
}
