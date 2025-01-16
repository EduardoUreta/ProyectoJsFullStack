import { ValidateSignature } from "../utils/index.js"

export const IsAdminMiddleware = (req, res, next) => {
    const signature = ValidateSignature(req);

    if(signature && req?.user?.role == "admin") {
        return next(); 
    } else {
        return res.status(401).redirect("/");
    };
};