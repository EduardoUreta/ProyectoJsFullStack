import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { __dirname } from './__dirname.js';
import { v4 as uuidv4 } from "uuid";

const avatarDirectory = path.resolve('./public/assets/img');

if (!fs.existsSync(avatarDirectory)) {
  fs.mkdirSync(avatarDirectory, { recursive: true });
}
// Configurar para guardar imagenes de usuarios
const avatarStorage = multer.diskStorage({
    // Donde guardar img
    destination: function(req, file, callback){
        callback(null, avatarDirectory);
    },
    // Nombre de las imagenes
    filename: function(req, file, callback){
        callback(null, `${uuidv4()}-${file.originalname}`)
    }
});

export const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); 
    } else {
      cb(new Error('Solo se permiten imágenes (jpeg, png, gif)'), false); 
    }
  };
  

// Crear Uploader de las img de perfil
export const uploadAvatar = multer({
    storage: avatarStorage, 
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});