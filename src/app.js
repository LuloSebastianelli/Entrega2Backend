import express from 'express';
import config from './config/config.js';
import { __dirname } from './utils.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';

import viewRouter from './routes/view.router.js';
import userRouter from './routes/user.router.js';

const URL_MONGO = config.URL_MONGO;
const PORT = config.PORT;

//configuramos la app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.FIRMA_COOKIE));
app.use(express.static(__dirname + '/public'));


app.use('/user', viewRouter);
app.use('/api/user', userRouter);

//configuramos handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//configuramos y conectamos la base de datos
mongoose.connect(URL_MONGO)
    .then(
        () =>
            app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
    )
    .catch((error) => console.log(error));