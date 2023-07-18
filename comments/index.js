const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const axios = require('axios')


const app = express()
app.use(express.json())
app.use(cors())

const commentsByPostId = {}

app.get('/post/:id/comments', (req,res)=>{
    res.send(commentsByPostId[req.params.id] || [])

})

app.post('/post/:id/comments', async(req,res)=>{
    //Se genera un id para el comentario
    const commentId = randomBytes(4).toString('hex')

    //Se obtiene el comentario que se envio por POST    
    const { content }= req.body

    
    //Si es vacio devuelve un arreglo vacio
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id:commentId, content, status:'pending' })

    commentsByPostId[req.params.id] = comments

    //Se emite el evento hacia el EventBus
    await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{
            id:commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.status(201).send(comments)

})

//Se recibe el evento
app.post('/events', async(req,res)=>{
    console.log('recibiendo evento', req.body.type)

    const { type, data } = req.body
    
    
    if( type==='CommentModerated'){
        //Se extrae la info del evento
        const { postId, id, status,content } = data

        //Se buca el comentario a actualizar
        const comments = commentsByPostId[postId]

        //Se busca cual es comentario exacto
        const comment = comments.find(comment => {
            return comment.id == id;
        })

        //Se le cambia el estatus
        comment.status = status

        //Se envia el comentario actualizado nuevamente al EventBus
        await axios.post('http://localhost:4005/events',{
            type:'CommentUpdated',
            data:{
                id,
                status,
                postId,
                content
            }
        })
    }

    res.send({});
})

app.listen(4001, ()=>{
    console.log('Puerto 4001')
})