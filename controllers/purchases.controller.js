import * as db from "../models/index.cjs";

const { LibrosUsuario } = db.default;

export class PurchasesController{

    static getPurchases = async(req, res, next) => {
        try {
            const purchases = await LibrosUsuario.findAll();
            return res.status(200).json(purchases);  
        } catch (error) {
            next(error);
        };
    };

    static getPurchaseById = async(req, res, next) => {
        const id = req.params.id;
        try {
            const purchase = await LibrosUsuario.findByPk(id);
            return res.status(200).json(purchase);  
        } catch (error) {
            next(error);
        };
    };

    static createPurchase = async (req, res, next) => {
        const data = req.body;
        try {
            const purchase = await LibrosUsuario.create(data);
            return res.status(201).json({message: "Compra creada"});
        } catch (error) {
            next(error);
        };
    };

    static updatePurchase = async (req, res, next) => {
        const id = req.params.id;
        const data = req.body;
        try {
            const findPurchase = await LibrosUsuario.findByPk(id);
            if(!findPurchase) return res.status(400).json({message: "Compra no encontrado"});
    
            await LibrosUsuario.update(data, { where: {id}});
            return res.status(200).json({message: "Compra Actualizado"});
        } catch (error) {
            next(error);
        };
    };

    static deletePurchase = async (req, res, next) => {
        const id = req.params.id;
        try {
            const purchase = await LibrosUsuario.destroy({where: {id}});
            if(!purchase) return res.status(404).json({message: "Compra no encontrada"});
    
            return res.status(200).json({message: "Compra eliminada"}); 
        } catch (error) {
            next(error);
        };
    };
};