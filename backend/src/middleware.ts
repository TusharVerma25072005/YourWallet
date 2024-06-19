import jwt from 'jsonwebtoken';
import express, { Request as ExpressRequest, Response, NextFunction } from 'express';
import JWT_KEY from './config';



interface CustomRequest extends ExpressRequest {
    userId?: string; 
}

function authUser(req: CustomRequest, res: Response, next: NextFunction){
    console.log("Reached middleware");
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token recieved " ,token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log("Authorized");
    const userId = jwt.verify(token, JWT_KEY);
    console.log("User id recieved", userId);
    if(!userId){
        return res.status(401).json({message : "Unauthorized"});
    }
    req.userId = userId.toString() ; 
    next();
}


export default authUser;
