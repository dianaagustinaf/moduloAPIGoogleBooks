import express from 'express'

function createRestApi(sender) {
  const app = express()

  app.use(express.json())

  app.get("/buscarLibro",async (req,res)=>{
      console.log("GET")
  })
}

function crearServidor({sender, port = 0}){
    const app = createRestApi(sender)

    return new Promise((resolve, reject) => {
        const server = app.listen(port)
          .once('error', () => {
            reject(new Error('error al conectarse al servidor'))
          })
          .once('listening', () => {
            server.port = server.address().port
            console.log(`Servidor esuchando en el puerto ${port}`)
            resolve(server)
          })
      })
}

export { crearServidor }