import { BankAccount } from "./BankAccount.js";
import { Transaction } from "./Transaction.js";

export class CheckingAccount extends BankAccount{
    overdraftLimit: number;

    constructor(owner: string, overdraftLimit: number){
        super(owner);

        if(overdraftLimit >= 0){
            this.overdraftLimit = overdraftLimit;
        }else{
            throw new Error("Overdraft Limit should be 0 or positive")
        }
    }

    withdraw(amount: number) {
        let balance = this.getBalance();

        if(Math.abs(balance - amount) > this.overdraftLimit){
            throw new Error("Overdraft Limit exceeded")
        }

        this.setBalance(balance - amount);

        let transaction = new Transaction("overdraft", amount, balance - amount);
        this.transactionHistory.push(transaction); 
    }
}