import React, { useState, useEffect } from 'react'
import styles from './style.module.css'

export default function Wait({title="Waiting For Oponent"}) {
    const [spinner, setSpinner] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
          setSpinner(prevSpinner => prevSpinner + 1);
        }, 10);
    
        return () => clearInterval(interval); 
      }, []);

    return (
        <div className={styles.wait}>
            <div style={{ rotate: `${spinner}${'deg'}`}}>
                <img src='spinner.svg'></img>
            </div>
            <div className={styles.title}>{title}</div>
        </div>
        
    )
}
