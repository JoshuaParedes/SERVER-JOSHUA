const express=require('express');
const cors=require('cors');
const { ConexionDB } = require('../database/config');

class Servidor {
    constructor(){
        this.app=express();
        this.port=process.env.PORT;
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        ConexionDB();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    
    routes(){
      this.app.use('/api/usuarios',require('../routes/usuarios'));
    }

    

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor ejecutandose en el puerto',this.port)
        })
    }
}
module.exports=Servidor;