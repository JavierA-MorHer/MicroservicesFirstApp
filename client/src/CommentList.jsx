//import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const CommentList = ({ comments }) => {

  //VERSION ANTES DE IMPLEMENTAR SERVICIO DE QUERY
    // const [comments, setComments] = useState([])

    // const fetchData = async()=>{
    //     const res = await axios.get(`http://localhost:4001/post/${postId}/comments`)

    //     setComments(res.data)
    // }

    // useEffect(() => {
    //   fetchData()  
    // }, [comments])
    

    const renderedComments = comments.map(comment =>{
        let content;

        if(comment.status === 'approved'){
          content = comment.content
        }

        if(comment.status === 'pending'){
          content = 'This comment is awaiting moderation'
        }

        if(comment.status === 'rejected'){
          content = 'This comment has been rejected'
        }


        return <li key={comment.id}>{content}</li>
    })

  return <ul>{renderedComments}</ul>
  
}
