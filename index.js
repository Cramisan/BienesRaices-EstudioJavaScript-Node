//llamar el modulo de node_modules
//const express = require('express') usa common js
import express from 'express'   //usa ECMA SCRIPT MODULES
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'
//Crear la app

const app = express()

//Habilitar lectura de los datos de formularios habilita recibir los request
app.use(express.urlencoded({extended: true}) )
app.use(express.json())

//Conexion a la base de datos

try{
    await db.authenticate()
    /*db.sync crea la tabla en caso que no exista */
    db.sync()
    console.log('Conexion realizada correctamente')
} catch (error){
    console.log(error)

}


// Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta publica o contendeor de archivos estaticos
app.use(express.static('public'))


//Routing
// get usa una ruta en especifico, use busca una ruta que empiece con el primer termino (/)

app.use('/auth',usuarioRoutes)

//-------se encuentra en la pagina para rutas

// Definir un puerto y arrancar el proyecto 
const port = 3000
app.listen(port, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${port}`)
})
