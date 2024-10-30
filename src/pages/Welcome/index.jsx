import React from 'react'
import Button from '../../componenents/Button'
import styles from './style.module.css'
import Signup from '../Signup'
import Login from '../Login'
import usePage from '../../context/PageContext';


export default function Welcome() {
  const { setPage } = usePage()

  return (
    <div className={styles.welcome}>
      <img src='logo.png'></img>
      <Button text='login' onClick={() => setPage(<Login/>)}/>
      <Button text='sign up' onClick={() => setPage(<Signup/>)}/>
    </div>
  )
}
