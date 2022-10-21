import { check, validationResult } from 'express-validator'
import Usuario from "../models/Usuario.js"
import { generarId  } from '../helpers/tokens.js'


const formularioLogin = (req,res) => {
    res.render('auth/login', {
        pagina:'Iniciar Sesion'
    })

}
const formularioRegistro = (req,res) => {
    res.render('auth/registro', {
        pagina : 'Crear Cuenta',
    })
}

const registrar = async (req,res) => {
    //Validacion
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('No es un email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El password debe ser de al menos 6 caracteres').run(req)
    await check('repetir_password').equals('password').withMessage('El password no es igual')


    let resultado = validationResult(req)



    //Verificar el resultado
    if (!resultado.isEmpty()){
        
        //errores
        return   res.render('auth/registro', {
            pagina:'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre : req.body.nombre,
                email: req.body.email
            }
        })
    }
    
    const {nombre, email, password } = req.body 


    //Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne( { where : {email } })
    if(existeUsuario){
        return res.render('auth/registro',{
            pagina: 'Crear Cuenta',
            errores: [{msg: 'El usuario ya esta registrado'}],
            usuario:{
                nombre: req.body.nombre,
                email: req.body.email

            }
        })
    }

    //Almacenar usuario con password encriptado
    await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    })

    // Mostrar mensaje de confirmacion

    res.render('templates/mensaje', {
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un email de confirmacion, presiona en el enlace'
    })


    //console.log(req.body) permite ver el registro en JSON de lo que se esta cargando
    /*    const usuario = await Usuario.create(req.body)
        res.json(usuario) */

}

const formularioOlvidePassword = (req,res) => {
    res.render('auth/olvide-password', {
        pagina : 'Recupera tu acceso a Bienes Raices',
    })
}
/* una forma de exportar es --export default formularioLogin-- lo 
unico es que solamente es uno por archivo*/ 

/*de la siguiente forma se pueden exportar varios modulos por archivo 
se llaman export nombrados*/
export{
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar
}