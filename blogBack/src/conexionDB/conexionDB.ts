import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: true

};

export const conexionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB as string, options);
        console.log('Conexion establecida con el servidor');
    } catch (error) {
        console.log('Ocurrio un error en la conexion: ' + error);
        process.exit(1); // detiene la aplicación
    }
};