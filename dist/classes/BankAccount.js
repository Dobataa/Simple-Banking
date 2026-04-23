import { Transaction } from "./Transaction.js";
export class BankAccount {
    constructor(owner, dailyWithdrawalLimit) {
        this.owner = owner;
        this.balance = 0;
        this.transactionHistory = [];
        this.dailyWithdrawalLimit = dailyWithdrawalLimit;
        this.remainingDailyWithdrawalLimit = dailyWithdrawalLimit;
        this.lastWithdrawn = new Date();
        this.withdrawFee = 0.5;
    }
    getBalance() {
        return this.balance;
    }
    setBalance(balance) {
        this.balance = balance;
    }
    deposit(amount) {
        if (amount < 0) {
            throw new Error("Cannot deposit negative amount");
        }
        this.balance += amount;
        let transaction = new Transaction("deposit", amount, this.balance);
        this.transactionHistory.push(transaction);
    }
    withdraw(amount) {
        if (amount + this.withdrawFee > this.balance) {
            throw new Error("Not enough money");
        }
        const now = new Date();
        if (this.isDifferentDay(this.lastWithdrawn, now)) {
            this.remainingDailyWithdrawalLimit = this.dailyWithdrawalLimit;
        }
        if (amount > this.remainingDailyWithdrawalLimit) {
            throw new Error("Daily withdraw limit is exceeded");
        }
        this.balance -= amount + this.withdrawFee;
        this.remainingDailyWithdrawalLimit -= amount;
        this.lastWithdrawn = now;
        let transaction = new Transaction("withdraw", amount, this.balance);
        let withdrawFee = new Transaction("fee", this.withdrawFee, this.balance - this.withdrawFee);
        this.transactionHistory.push(transaction, withdrawFee);
    }
    transferTo(otherAccount, amount) {
        if (amount <= 0) {
            throw new Error("Money should be possitive value");
        }
        if (amount > this.balance) {
            throw new Error("Not enough money to transfer");
        }
        otherAccount.deposit(amount);
        this.balance -= amount;
        let transaction = new Transaction("transfer", amount, this.balance, this.owner, otherAccount.owner);
        this.transactionHistory.push(transaction);
    }
    isDifferentDay(d1, d2) {
        return d1.toDateString() !== d2.toDateString();
    }
}
//# sourceMappingURL=BankAccount.js.map