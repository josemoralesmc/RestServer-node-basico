const express = require('express')
const cors = require('cors')
const app = express()

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.usuariosPath = '/api/usuarios'

        // Middlewares

        this.middlewares()

        // parseo y lectura de body

        this.app.use(express.json())

        // Rutas de mi aplicacion
        this.routes()
    }

    middlewares(){
        // Directorio publico
        this.app.use(cors()) 
        this.app.use(express.static('public'))
    }

    routes(){
        
        this.app.use(this.usuariosPath, require('./routes/user.routes'))
        
    }

    listen() {
        this.app.listen(this.port, ( )=> {
            console.log("Servidor corriendo en el puerto", this.port)
        })
    }

}

module.exports = Server
