const express = require('express')
const cors = require('cors')
const app = express()
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            uploads:'/api/uploads',
            auth:'/api/auth',
            buscar:'/api/buscar',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos'
        }
       
        this.authPath = '/api/auth'

        // Conectar a base de datos
        this.conectarDB()

        // Middlewares

        this.middlewares()

        // parseo y lectura de body

        this.app.use(express.json())

        // Rutas de mi aplicacion
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        // Directorio publico
        this.app.use(cors()) 
        this.app.use(express.static('public'))
        // File upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'))
        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'))
        this.app.use(this.paths.usuarios, require('../routes/user.routes'))
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'))
        this.app.use(this.paths.productos, require('../routes/productos.routes'))
        
        
    }

    listen() {
        this.app.listen(this.port, ( )=> {
            console.log("Servidor corriendo en el puerto", this.port)
        })
    }

}

module.exports = Server