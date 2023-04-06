import { IndividualCard } from "@/Components/IndividualCard";
import { PostComment } from "@/Components/PostComment";
import React from "react";
import styles from "../../styles/Home.module.css";
import { requireAuthentication } from "../../Components/requireAuthentication";
import baseUrl from "../../Config/baseUrl";
const individualid = ({ data }) => {
  return (
    <div className={`${styles.parentContainerindiServer}`}>
      <IndividualCard item={data.result} />
      {/* HERE PASSED DATA ON POSTCOMMENT SO THAT THERE ALREADY DONE COMMENT CAN BE SHOWN.. */}
      <PostComment item={data.result} />
    </div>
  );
};

export default individualid;

// calling protected route middleware.
export const getServerSideProps = requireAuthentication(async (context) => {
  const id = context.params.individualid;
  const data = await fetch(`${baseUrl}/api/blogbyid/${id}`);
  const result = await data.json();

  return {
    props: {
      data: result,
    },
  };
});
