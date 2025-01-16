import * as db from "../models/index.cjs";

const { Categoria } = db.default;

export class CategoriesController {

    static getCategories = async(req, res, next) => {
        try {
            const categories = await Categoria.findAll();
            return res.status(200).json(categories);  
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
            next(error);
        };
    };

    static getCategoryById = async (req, res, next) => {
        const id = req.params.id;
        try {
            const category = await Categoria.findByPk(id);
            return res.status(200).json(category);
        } catch (error) {
            next(error);
        };
    };

    static createCategory = async (req, res, next) => {
        const data = req.body;
        try {
            const category = await Categoria.create(data);
            return res.status(201).json({message: "Categoría creado"});
        } catch (error) {
            next(error);
        };
    };

    static updateCategory = async (req, res, next) => {
        const id = req.params.id;
        const data = req.body;
        try {
            const findCategory = await Categoria.findByPk(id);
            if(!findCategory) return res.status(400).json({message: "Categoría no encontrado"});
    
            await Categoria.update(data, { where: {id}});
            return res.status(200).json({message: "Categoria Actualizada"});
        } catch (error) {
            next(error);
        };
    };

    static deleteCategory = async (req, res, next) => {
        const id = req.params.id;
        try {
            const category = await Categoria.destroy({where: {id}});
            if(!category) return res.status(404).json({message: "Categoría no encontrada"});
    
            return res.status(200).json({message: "Categoria eliminada"}); 
        } catch (error) {
            next(error);
        };
    };

};