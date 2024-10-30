import React from 'react'
import styles from './style.module.css'


export default function WhiteContainer({children, title}) {

  return (
        <div className={styles.blackBorder} >
            {title&&<div className={styles.title}>{title}</div>}
            <div className={styles.whiteBox}> 
                {/* <div className={styles.inside}> */}
                    {children}
              {/* </div> */}
            </div>
        </div>
  )
}
