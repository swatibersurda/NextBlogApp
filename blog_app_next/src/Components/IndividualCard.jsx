import React from "react";
import styles from "../styles/Home.module.css";
export const IndividualCard = ({ item }) => {
  console.log(item, "opp");
  return (
    <div className={`${styles.individualCardContainer}`}>
      <div className={`${styles.card}`}>
        <img className={`${styles.individuImage}`} src={item.image} />
        <div className={`${styles.container}`}>
          <h2>
            <b>Title: {item.title}</b>
          </h2>
          <h3>
            <b>
              Role: {item.user_id.name} ({item.user_id.role})
            </b>
          </h3>
          <p>{item.content}</p>
        </div>
      </div>
    </div>
  );
};
