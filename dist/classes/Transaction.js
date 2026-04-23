export class Transaction {
    constructor(type, amount, resultingBalance, fromAccount, toAccount) {
        this.timeStamp = new Date();
        this.type = type;
        this.amount = amount;
        this.resultingBalance = resultingBalance;
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
    }
}
//# sourceMappingURL=Transaction.js.map