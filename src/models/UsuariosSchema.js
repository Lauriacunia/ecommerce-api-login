import mongoose from "mongoose";

export const UsuariosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        default: "Anonimo"
    },
    apellido: {
        type: String,
        required: true,
        default: "Anonimo"
    },
    email: {
        type: String,
        required: true,
        default: ""
    },
    password: {
        type: String,
        required: true,
        default: ""
    },
    imagen: {
        type: String,
        required: true,
        default: ""
    }
});