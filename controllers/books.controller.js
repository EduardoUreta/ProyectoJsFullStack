import * as db from "../models/index.cjs";

const { Libro } = db.default;

export class BooksController{

    static getBooks = async(req, res, next) => {
        try {
            const books = await Libro.findAll();
            return res.status(200).json(books);  
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static getBookById = async(req, res, next) => {
        const id = req.params.id;
        try {
            const book = await Libro.findByPk(id);
            return res.status(200).json(book);  
        } catch (error) {
            next(error);
        };
    };

    static createBook = async (req, res, next) => {
        const data = req.body;

        let imagenURL = null;
    
        if (req.file) {
            imagenURL = `assets/img/${req.file.filename}`;
        }

        const userData = {
            ...data, 
            imagen: imagenURL 
        };

        try {
            const book = await Libro.create(userData);
            return res.status(201).json({message: "Libro creado"});
        } catch (error) {
            next(error);
        };
    };

    static updateBook = async (req, res, next) => {
        const id = req.params.id;
        const data = req.body;
        
        try {
            const findBook = await Libro.findByPk(id);
            if(!findBook) return res.status(400).json({message: "Libro no encontrado"});
    
            await Libro.update(data, { where: {id}});
            return res.status(200).json({message: "Libro Actualizado"});
        } catch (error) {
            next(error);
        };
    };

    static deleteBook = async (req, res, next) => {
        const id = req.params.id;
        try {
            const book = await Libro.destroy({where: {id}});
            if(!book) return res.status(404).json({message: "Libro no encontrado"});
    
            return res.status(200).json({message: "Libro eliminado"}); 
        } catch (error) {
            next(error);
        };
    };
    
};