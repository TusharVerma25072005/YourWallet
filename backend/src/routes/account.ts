import express, { Request as ExpressRequest, Response, NextFunction } from 'express';
import prisma from '../db';
import authUser from '../middleware';

interface CustomRequest extends ExpressRequest {
    userId?: string;
}

const AccountRouter = express.Router();


AccountRouter.get('/balance',authUser, async (req : CustomRequest, res : Response) => {
    console.log("user asked balance");
    const balance = await prisma.account.findUnique({
        where : {
            userId : req.userId
        },
        select : {
            balance : true
        }
    });
    console.log(balance);
    res.status(200).json({balance});
});

AccountRouter.put('/transfer', authUser , async (req : CustomRequest, res : Response) => {
    console.log("user asked to transfer");
    const { amount, to } = req.body;
    const from: string = req.userId!;
    const fromAccount =await prisma.account.findUnique({
        where : {
            userId : from
        }
    });
    const toAccount =await prisma.account.findUnique({
        where : {
            userId : to
        }
    });
    console.log(fromAccount, toAccount);
    if(!fromAccount || !toAccount){
        res.status(400).json({message : "Account not found"});
        return;
    }
    if(fromAccount && fromAccount.balance < amount){
        res.status(400).json({message : "Insufficient balance"});
        return;
    }
    console.log(from, to, amount);
    console.log("Transferring money")
    try{
    await prisma.$transaction([
         prisma.account.update({
            where : {
                userId : from
            },
            data : {
                balance : {
                    decrement : amount
                }
            }
        }),
        prisma.account.update({
            where : {
                userId : to
            },
            data : {
                balance : {
                    increment : amount
                }
            }
        })
    ]);
    
    await prisma.transaction.create({
        data : {
            amount : amount,
            from  : from,
            to : to
        }
    });
    res.status(200).json({message : "Money transferred"});
    }catch(e){
        console.log(e);
        res.status(500).json({message : "Internal server error"});
    }
});


AccountRouter.get('/recieved',authUser, async (req : CustomRequest, res : Response) => {
    console.log("user asked for recieved");
    const recieved =  await prisma.transaction.findMany({
        where : {
            to : req.userId
        }
        ,
        select : {
            id : true,
            amount : true,
            from : true,
            to : true,
            time : true,
            sender : {
                select : {
                    name : true
                }
            },
            receiver : {
                select : {
                    name : true
                }
            }
        }
    });
    console.log(recieved);
    res.status(200).json({recieved});
});

AccountRouter.get('/sent',authUser, async (req : CustomRequest, res : Response) => {
    console.log("user asked for sent");
    console.log(req.userId);
    const sent = await prisma.transaction.findMany({
        where : {
            from : req.userId
        },
        select : {
            id : true,
            amount : true,
            from : true,
            to : true,
            time : true,
            receiver : {
                select : {
                    name : true
                }
            },
            sender : {
                select : {
                    name : true
                }
            }
        }
    });
    console.log(sent);
    res.status(200).json({sent});
});

export default AccountRouter;