import React from 'react'

const individualid = ({result}) => {
    // console.log(context.params.individualid,"kkk")
  return (
    <div>
      i am individual
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