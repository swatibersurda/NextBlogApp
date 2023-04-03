import { IndividualCard } from '@/Components/IndividualCard'
import { PostComment } from '@/Components/PostComment'
import React from 'react'
import styles from "../../styles/Home.module.css"
const individualid = ({data}) => {
    // console.log(context.params.individualid,"kkk")
  return (
    <div className={`${styles.parentContainerindiServer}`}>
     <IndividualCard item={data.result}/>
     {/* HERE PASSED DATA ON POSTCOMMENT SO THAT THERE ALREADY DONE COMMENT CAN BE SHOWN.. */}
     <PostComment item={data.result}/>
    </div>
  )
}

export default individualid


export async function getServerSideProps({params:{individualid}}){
   console.log(individualid,"indiii....")

    const data=await fetch(`http://localhost:3000/api/blogbyid/${individualid}`)
    const result=await data.json()
     console.log(result ,"resulttt at getserverside")
    return{
        props:{
          data:result
        }
    }

}