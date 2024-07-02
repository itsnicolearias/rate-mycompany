import express, { Application } from "express";
import { PrismaClient } from '@prisma/client'

export const Prisma = new PrismaClient()

export class App {
    app: Application
    constructor(){
        this.app = express()
    }

    async listen() {
       await this.app.listen(4000);
       console.log('server running')
       await Prisma.$connect().then(() => console.log('DB coneccted'))
    }
}