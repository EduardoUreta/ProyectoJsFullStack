import * as db from "../models/index.cjs";

const { Autor } = db.default;

export class AuthorsController {
    
    static getAuthors = async(req, res, next) => {
        try {
            const autors = await Autor.findAll();
            return res.status(200).json(autors);
        } catch (error) {
            next(error);            
        };
    };

    static getAuthorById = async (req, res, next) => {
        const id = req.params.id;
        try {
            const author = await Autor.findByPk(id);
            return res.status(200).json(author);
        } catch (error) {
            next(error);
        };
    };

    static createAuthor = async (req, res, next) => {
        const data = req.body;
        try {
            const author = await Autor.create(data);
            return res.status(201).json({message: "Autor creado"});
        } catch (error) {
            next(error);
        };
    };

    static updateAuthor = async (req, res, next) => {
        const id = req.params.id;
        const data = req.body;
        try {
            const findAuthor = await Autor.findByPk(id);
            if(!findAuthor) return res.status(400).json({message: "Autor no encontrado"});
    
            await Autor.update(data, { where: {id}});
            return res.status(200).json({message: "Autor Actualizado"});
        } catch (error) {
            next(error);
        };
    };

    static deleteAuthor = async (req, res, next) => {
        const id = req.params.id;
        try {
            const author = await Autor.destroy({where: {id}});
            if(!author) return res.status(404).json({message: "Autor no encontrado"});
    
            return res.status(200).json({message: "Autor eliminado"}); 
        } catch (error) {
            next(error);
        };
    };

};