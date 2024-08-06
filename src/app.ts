import express, { Application } from "express";
import { PrismaClient } from '@prisma/client'
import cors from 'cors';
import morgan from 'morgan'
import bodyParser from 'body-parser';
import { boomErrorHandler, errorHandler } from "./middlewares/error-handler";
import indexRoutes from "./routes/index.routes";

export const Prisma = new PrismaClient()

export class App {
    app: Application
    constructor(){
        this.app = express()
        this.routes();
        this.config()
    }

    public async config() {
    
        /*const whiteList: any[] = [
          `/.localhost:${config.port}$/`,
          `/.localhost:${config.portFront}$/`,
          `/.${config.urlFront}`,
          /.localhost:3000$/
        ];*/
        const options: cors.CorsOptions = {
          origin: '*',
          //credentials: true,
        };
        this.app.use(morgan('dev'))
        this.app.use(cors(options));
        this.app.use(bodyParser.json());
        this.app.use(express.static('public'));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.set('trust proxy', true);
      }

    routes(): void {
        this.app.use('/api/v1', indexRoutes);
      }

    async listen() {
        this.app.use(boomErrorHandler);
        this.app.use(errorHandler);

       this.app.listen(4000);
       console.log('server running')
       await Prisma.$connect().then(() => console.log('DB coneccted'))
    }
}