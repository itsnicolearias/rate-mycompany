import express, { Application } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class App {
    app: Application
    constructor(){
        this.app = express()
    }

    async listen() {
       await this.app.listen(4000);
       console.log('server running')
       //await prisma.
    }
}