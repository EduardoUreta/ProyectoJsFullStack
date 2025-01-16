import * as db from "../models/index.cjs";

const { Usuario, LibrosUsuario } = db.default;

export class UsersController {

    static getUsers = async (req, res, next) => {
        try {
            const users = await Usuario.findAll();
            return res.status(200).json(users);
        } catch (error) {
            next(error);
        };
    };

    static getUserById = async (req, res, next) => {
        const id = req.params.id;
        try {
            const user = await Usuario.findByPk(id);
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        };
    };

    static createUser = async (req, res, next) => {
        const data = req.body;
        try {
            const user = await Usuario.create(data);
            return res.status(201).json({message: "Usuario creado"});
        } catch (error) {
            next(error);
        };
    };

    static updateUser = async (req, res, next) => {
        const id = req.params.id;
        const data = req.body;
        try {
            const findUser = await Usuario.findByPk(id);
            if(!findUser) return res.status(400).json({message: "Usuario no encontrado"});
    
            await Usuario.update(data, { where: {id}, individualHooks: true});
            return res.status(200).json({message: "Usuario Actualizado"});
        } catch (error) {
            next(error);
        };
    };

    static deleteUser = async (req, res, next) => {
        const id = req.params.id;
        try {
            const user = await Usuario.destroy({where: {id}});
            if(!user) return res.status(404).json({message: "Usuario no encontrad"});
    
            return res.status(200).json({message: "Usuario eliminado"}); 
        } catch (error) {
            next(error);
        };
    };

    static findPurcharse = async(req, res, next) => {
        const id = req.params.id;
        try {
            const userResult = await Usuario.findByPk(id);
            if (!userResult) return res.status(404).json({ error: "Usuario no encontrado" });
            
            const userBooks = await userResult.getLibros();
            return res.status(200).json(userBooks);
        } catch (error) {
            next(error);
        };
    };
    

};