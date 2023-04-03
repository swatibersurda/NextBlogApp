import React from 'react'
import styles from "../styles/Home.module.css";
export const IndividualCard = ({item}) => {
    console.log(item,"opp")
  return (
<div className={`${styles.individualCardContainer}`}>
<div className={`${styles.card}`}>
  <img className={`${styles.individuImage}`} src={item.image}/>
  <div className={`${styles.container}`}>
  <h4><b>{item.title}</b></h4> 
    <h4><b>{item.user_id.role}:{item.user_id.name}</b></h4> 
    <p>{item.content}</p> 
  </div>
</div>
</div>

  )
}


