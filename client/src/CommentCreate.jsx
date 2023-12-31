import axios from 'axios'
import React, { useState } from 'react'

export const CommentCreate = ({ postId }) => {

    const [content, setContent] = useState('')

    const onSubmit = async(e)=>{
        e.preventDefault()

        await axios.post(`http://localhost:4001/post/${postId}/comments`,{
            content
        })

        setContent('')
    }


  return (
    <div>
        <form onSubmit={onSubmit}>
            <div className='form-group mb-2'>
                <label>New Comment</label>
                <input value={content} onChange={e => { setContent(e.target.value)}} className='form-control'/>
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}
