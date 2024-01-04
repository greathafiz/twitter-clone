import { Request, Response } from "express";

export const register = async (req:Request, res:Response) => {
    try {
        res.send('Register USer')
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}

export const login = async (req:Request, res:Response) => {
    try {
        res.send('Login USer')
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}