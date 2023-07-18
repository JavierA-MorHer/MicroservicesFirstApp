import axios from 'axios'
import React, { useState } from 'react'

export const PostCreate = () => {

    const [title, setTitle] = useState('')

    const onSubmit = async(e)=>{
        e.preventDefault();

        await axios.post('http://localhost:4000/posts',{
            title
        });

        setTitle('');
    }

  return (
    <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} type="text" className='form-control' />
                <button className='btn btn-primary mt-2'>Submit</button>
            </div>
        </form>
    </div>
  )
}
