express = require('express')
const axios = require('axios')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())

//Aqui se guardaran todos los eventos que lleguen
const events = []


//Endpoint que recibira el evento que estemos emitiendo y hara la peticion al endpoint correspondiente

app.post('/events',(req,res)=>{

  //El evento es la informacion que viene desde el body de la peticion
    const event = req.body

    //Guardar los eventos
    events.push(event)

    axios.post('http://localhost:4000/events',event).catch((err) => {
      console.log(err.message);
    });
    axios.post('http://localhost:4001/events',event).catch((err) => {
      console.log(err.message);
    });
    axios.post('http://localhost:4002/events',event).catch((err) => {
      console.log(err.message);
    });
    axios.post('http://localhost:4003/events',event).catch((err) => {
      console.log(err.message);
    });


    res.send({status:'OK'})



  })

  app.get('/events', (req,res)=>{

    res.send(events)
    
  })

  app.listen(4005, ()=>{
    console.log('Puerto 4005')
  })