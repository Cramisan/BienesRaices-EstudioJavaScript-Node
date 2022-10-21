import express, { Router } from 'express'
import { formularioLogin, formularioRegistro, formularioOlvidePassword,registrar } from '../controllers/usuarioController.js'

const router = express.Router()

    router.get('/login', formularioLogin)
    router.get('/registro', formularioRegistro)
    /*se  genera el POST del formulario para guardar los datos */
    router.post('/registro', registrar)
    router.get('/olvide-password', formularioOlvidePassword)

export default router