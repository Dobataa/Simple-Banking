import { BankAccount } from "./BankAccount.js";
import { Transaction } from "./Transaction.js";

export class CheckingAccount extends BankAccount{
    overdraftLimit: number;

    constructor(owner: string, dailyWithdrawalLimit: number, overdraftLimit: number){
        super(owner, dailyWithdrawalLimit );

        if(overdraftLimit >= 0){
            this.overdraftLimit = overdraftLimit;
        }else{
            throw new Error("Overdraft Limit should be 0 or positive")
        }
    }

    withdraw(amount: number) {
        const now = new Date();

        if(this.isDifferentDay(this.lastWithdrawn, now)){
            this.remainingDailyWithdrawalLimit = this.dailyWithdrawalLimit;
        }

        if(amount > this.remainingDailyWithdrawalLimit){
            throw new Error("Daily withdraw limit is exceeded");
        }

        let balance = this.getBalance();

        if(Math.abs(balance - amount) > this.overdraftLimit){
            throw new Error("Overdraft Limit exceeded")
        }

        this.setBalance(balance - amount);
        this.remainingDailyWithdrawalLimit -= amount;

        let transaction = new Transaction("overdraft", amount, balance - amount);
        this.transactionHistory.push(transaction); 
    }
}