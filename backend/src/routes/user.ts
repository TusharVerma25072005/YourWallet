import express, { Request as ExpressRequest, Response, NextFunction } from 'express';
import prisma from '../db';
import authUser from '../middleware';
import { z } from 'zod';
import JWT_KEY from '../config'
import jwt from 'jsonwebtoken';



interface CustomRequest extends ExpressRequest {
    userId?: string;
}

const updateSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional()
});

const registerSchema = z.object({
    name: z.string( { message: "Invalid name" }),
    email: z.string().email( { message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters long" })
});


const UserRouter = express.Router();



UserRouter.get('/me', authUser, async (req: CustomRequest, res: express.Response) => {
    try {
        console.log("user asked for details");
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        console.log("User details sent")
        res.status(200).json({ user });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

UserRouter.put('/me', authUser, async (req: CustomRequest, res: express.Response) => {
    try {
        console.log("user asked to update details")
        console.log(req.body)
        const { email } = req.body;
        const { name } = req.body;
        console.log("email and name recieved", email, name);
        const result = updateSchema.safeParse({ email, name });
        if (!result.success) {
            console.log("Zod Validation failed", JSON.parse(result.error.message)[0].message)
            return res.status(400).json({ message: JSON.parse(result.error.message)[0].message });
        }
        console.log("Zod Validation passed");
        const updateduser = await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                email: email,
                name: name
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        console.log("User updated");
        console.log(updateduser);
        res.status(200).json({ updateduser });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

UserRouter.get('/search', authUser, async (req: CustomRequest, res: express.Response) => {
    try {
        const { name } = req.query;
        console.log("A user asked to search for user with name", name);
        const users = (await prisma.user.findMany({
            where: {
                name: {
                    contains: name as string,
                    mode: "insensitive"
                }
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })).filter((user) => user.id !== req.userId);
        console.log(users);
        console.log("Users found");
        res.status(200).json({ users });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

UserRouter.post('/register', async (req: CustomRequest, res: express.Response) => {
    try {
        console.log("user asked register");
        const { name, email, password } = req.body;
        console.log("name, email and password recieved", name, email, password);
        const result = registerSchema.safeParse({ name, email, password });
        if (!result.success) {
            console.log(result);
            console.log("Zod Validation failed", JSON.parse(result.error.message)[0].message);
            return res.status(400).json({ message: JSON.parse(result.error.message)[0].message });
        }
        console.log("Zod Validation passed");
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        await prisma.account.create({
            data: {
                userId: user.id,
                balance: 10000
            }
        });
        const token = jwt.sign(user.id, JWT_KEY);
        console.log(" A new User registered");
        res.status(200).json({ token, user });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

UserRouter.post('/login', async (req: CustomRequest, res: express.Response) => {
    try {
        console.log(" A user asked to login");
        const { email, password } = req.body;
        console.log("email and password recieved ", email, password);
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        if (!user) {
            console.log("Invalid credentials");
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(user.id, JWT_KEY);
        console.log("User logged in");
        res.status(200).json({ token, user });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default UserRouter;