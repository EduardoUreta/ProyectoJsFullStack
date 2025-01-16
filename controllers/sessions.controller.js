import * as db from "../models/index.cjs"
import { verifyPassword, CreateSignature } from "../utils/index.js";

const { Usuario } = db.default;

export class SessionsController{

    static login = async(req, res, next) => {
        const { correo, contrasena } = req.body;
        try {
            // Validar que existe el usuario, y validar su contraseña
            const usuario = await Usuario.findOne({where: { correo: correo }});
            const validPassword = await verifyPassword(contrasena, usuario.contrasena);
            
            if(!usuario || !validPassword) throw new Error("Credenciales Inválidas", { cause: "INVALID_CREDENTIALS" });

            // Crear Firma
            const signature = CreateSignature({
                _id: usuario.id,
                email: usuario.email,
                role: usuario.role
            });
            
            return res.cookie('Bearer', signature).json({message: "Usuario logueado"});

        } catch (error) {
            next(error);
        };
    };

    static logout = async(req, res, next) => {
        if(req.user){
            return res.clearCookie('Bearer').json({message: "Sesión Cerrada"});
        };
        return res.json({message: "No estás logueado para cerrar sesión"})
    };

};