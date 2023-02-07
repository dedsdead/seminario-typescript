import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import houseRoutes from './routes/House';
import characterRoutes from './routes/Character';

const router = express();

// Conexão com o mongodb
mongoose
    .set('strictQuery', true)
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected to mongodb');
        startServer();
    })
    .catch((error) => {
        Logging.error('Unnable to connect: ');
        Logging.error(error);
    });

// Iniciar o servidor se o mongodb conectar
const startServer = () => {
    router.use((req, res, next) => {
        //Log de requisições
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            //Log de respostas
            Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    //Regras da API
    router.use((req, res, next) => {
        //Requisicoes de qualquer origem
        res.header('Access-Control-Allow-Origin', '*');
        //Headers utilizados
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        //Se passado o parametro options em method, retorna os metodos que podem ser utilizados
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELTE, GET');
            return res.status(200).json({});
        }

        next();
    });

    //Rotas
    router.use('/houses', houseRoutes);
    router.use('/characters', characterRoutes);

    // Teste de funcionamento da API
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

    //Tratamento de erro
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
