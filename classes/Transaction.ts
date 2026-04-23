type TransactionType = "deposit" | "withdraw"| "transfer"| "interest"| "overdraft" | "fee";

export class Transaction{
    timeStamp: Date;
    type: TransactionType
    amount: number
    resultingBalance: number
    fromAccount?: string | undefined
    toAccount?: string | undefined

    constructor(
        type: TransactionType,
        amount: number,
        resultingBalance: number,
        fromAccount?: string,
        toAccount?: string
    ){
        this.timeStamp = new Date();
        this.type = type;
        this.amount = amount;
        this.resultingBalance = resultingBalance;
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
    }
}