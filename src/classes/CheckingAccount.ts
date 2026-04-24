import { BankAccount } from "./BankAccount.js";
import { Transaction } from "./Transaction.js";

export class CheckingAccount extends BankAccount{
    overdraftLimit: number;
    isFeeApplied: boolean;

    constructor(owner: string, dailyWithdrawalLimit: number, overdraftLimit: number){
        super(owner, dailyWithdrawalLimit );
        this.isFeeApplied = false;

        if(overdraftLimit < 0){
            throw new Error("Overdraft Limit should be 0 or positive")
        }

        this.overdraftLimit = overdraftLimit;
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

        if(balance - amount < 0){
            if(this.isDifferentDay(this.lastWithdrawn, new Date)){
                this.isFeeApplied = false;
            }
            
            if(!this.isFeeApplied){
                this.isFeeApplied = true;

                let transaction = new Transaction("fee", amount, balance - amount);
                this.transactionHistory.push(transaction); 
            }
        }

        this.setBalance(balance - amount - this.withdrawFee);
        this.remainingDailyWithdrawalLimit -= amount;

        let transaction = new Transaction("overdraft", amount, balance - amount);
        let withdrawFee = new Transaction("fee", this.withdrawFee, this.getBalance());
        this.transactionHistory.push(transaction, withdrawFee); 
    }
}