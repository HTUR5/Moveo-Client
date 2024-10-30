
import React from 'react'
import styles from './style.module.css'

export default function Button({ text = "Back", onClick }) {
    return (
        <div className={styles.orange} onClick={onClick}>
            <div className={styles.yellow} >
                <span className={styles.text}>{text}</span>
            </div>
        </div>
    )
}
