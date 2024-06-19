import { atom } from "recoil";

type transactions = {
    id : string,
    from : string,
    to : string,
    amount : number
}


export const balance = atom({
    key: "balance",
    default: 0
});

export const sentTransactions = atom({
    key: "sentTransactions",
    default: [] as transactions[]
});

export const receivedTransactions = atom({
    key: "receivedTransactions",
    default: [] as transactions[]
});

type UserType = {
    id :{ type : string,
    default : ""
},
    
    name : {type: string,
    default : ""
    },
    email : {type : string,
    default : ""
    }
}

export const user = atom({
    key: "user",
    default: {} as UserType
});