import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { conexionDB } from './conexionDB/conexionDB';
conexionDB();

/** Importación de rutas */
import { userRouter, articleRouter } from './routes';

/** Inicializar express y dotenv */
const app = express();
dotenv.config();

// enable cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', userRouter);
app.use('/api/article', articleRouter);

// Listen requests
app.listen(process.env.PORT, () => {
    // tslint:disable-next-line: no-console
    console.log('Express server puerto : ' +process.env.PORT+ ' \x1b[32m%s\x1b[0m', ' onLine');
});

export default app;