import { UniqueConstraintError, ValidationError } from "sequelize";

export const errorHandler = async (error, req, res, next) => {
    console.error(error);

    if(error instanceof UniqueConstraintError) {
        const { original } = error;

        return res.status(409).json({message: original.detail});
    };

    if(error instanceof ValidationError) {
        const { errors } = error;
        const errorMessages = errors.map(({path, message}) => ({[path]: message}));

        return res.status(400).json(errorMessages);
    };

    if(error?.cause == 'INVALID_CREDENTIALS'){
        return res.status(401).redirect("/login");
    }


    return res.status(500).json({message: "Internal Server Error"});

};