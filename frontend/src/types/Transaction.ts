export type transaction = {
    id : string,
    from : string,
    to : string,
    amount : number
    sender : {
        name : string
    },
    receiver : {
        name : string
    }
}