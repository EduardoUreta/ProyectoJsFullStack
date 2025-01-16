import * as db from "../models/index.cjs";

const { Usuario } = db.default;

export class ViewsController {

    static inicio = async(req, res, next) => {
        res.render("inicio");
    };

    static registro = async (req, res, next) => {
        res.render("registro")
    };

    static login = async (req, res, next) => {
        res.render("login");
    };

    static tienda = async (req, res, next) => {
        res.render("tienda");
    };

    static detalleLibro = async (req, res, next) => {
        res.render("detalle-libro");
    };

    static perfil = async(req, res, next) => {
        const id = req.params.id;
        try {
            const usuario = await Usuario.findByPk(id);
            (usuario) ? res.render('perfil') : res.render('error404');
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error' });
        }
    };

    static agregarLibro = async (req, res, next) => {
        res.render("agregar-libro");
    };

    static listadoLibrosAdmin = async (req, res, next) => {
        res.render("listado-libros");
    };

    
    // static logout = async (req, res, next) => {
    //     res.render("inicio");
    // };

}